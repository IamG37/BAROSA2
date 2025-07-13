<template>
  <CalculatorLayout>
    <div class="basic-calculator">
      <div class="calculator-display">
        <div class="history">{{ history }}</div>
        <div class="current">{{ current || '0' }}</div>
      </div>
      <div class="calculator-buttons">
        <button @click="clear" class="btn clear">{{ $t('clear') }}</button>
        <button @click="toggleSign" class="btn operator">{{ $t('toggleSign') }}</button>
        <button @click="percentage" class="btn operator">{{ $t('percentage') }}</button>
        <button @click="setOperator('/')" class="btn operator">/</button>
        <button @click="appendNumber('7')" class="btn number">7</button>
        <button @click="appendNumber('8')" class="btn number">8</button>
        <button @click="appendNumber('9')" class="btn number">9</button>
        <button @click="setOperator('*')" class="btn operator">×</button>
        <button @click="appendNumber('4')" class="btn number">4</button>
        <button @click="appendNumber('5')" class="btn number">5</button>
        <button @click="appendNumber('6')" class="btn number">6</button>
        <button @click="setOperator('-')" class="btn operator">−</button>
        <button @click="appendNumber('1')" class="btn number">1</button>
        <button @click="appendNumber('2')" class="btn number">2</button>
        <button @click="appendNumber('3')" class="btn number">3</button>
        <button @click="setOperator('+')" class="btn operator">+</button>
        <button @click="appendNumber('0')" class="btn number zero">0</button>
        <button @click="appendDecimal" class="btn number">{{ $t('decimal') }}</button>
        <button @click="calculate" class="btn equals">{{ $t('equals') }}</button>
      </div>
    </div>
  </CalculatorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useHead } from '@vueuse/head'
import CalculatorLayout from '../CalculatorLayout.vue'
import { useLanguageStore } from '@/stores/language'
const languageStore = useLanguageStore()
const $t = languageStore.t

useHead({
  title: '기본 계산기 - Calculator37 | Barosa',
  meta: [
    { name: 'description', content: '기본 사칙연산, 퍼센트, 부호변경 등 실용적인 기능을 제공하는 Calculator37의 기본 계산기 서비스입니다.' },
    { property: 'og:title', content: '기본 계산기 - Calculator37 | Barosa' },
    { property: 'og:description', content: '기본 사칙연산, 퍼센트, 부호변경 등 실용적인 기능을 제공하는 Calculator37의 기본 계산기 서비스입니다.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://barosa.shop/calculator37/basic' }
  ],
  link: [
    { rel: 'canonical', href: 'https://barosa.shop/calculator37/basic' }
  ]
})

const current = ref('')
const history = ref('')
const operator = ref('')
const previousValue = ref(0)
const waitingForOperand = ref(false)

const clear = () => {
  current.value = ''
  history.value = ''
  operator.value = ''
  previousValue.value = 0
  waitingForOperand.value = false
}

const appendNumber = (num: string) => {
  if (waitingForOperand.value) {
    current.value = num
    waitingForOperand.value = false
  } else {
    current.value = current.value + num
  }
}

const appendDecimal = () => {
  if (waitingForOperand.value) {
    current.value = '0.'
    waitingForOperand.value = false
  } else if (current.value.indexOf('.') === -1) {
    current.value = current.value + '.'
  }
}

const toggleSign = () => {
  if (current.value) {
    current.value = current.value.startsWith('-') 
      ? current.value.substring(1) 
      : '-' + current.value
  }
}

const percentage = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = (value / 100).toString()
  }
}

const setOperator = (op: string) => {
  if (current.value) {
    if (operator.value && !waitingForOperand.value) {
      calculate()
    }
    previousValue.value = parseFloat(current.value)
    operator.value = op
    history.value = current.value + ' ' + getOperatorSymbol(op)
    waitingForOperand.value = true
  }
}

const getOperatorSymbol = (op: string) => {
  switch (op) {
    case '+': return '+'
    case '-': return '−'
    case '*': return '×'
    case '/': return '÷'
    default: return op
  }
}

const calculate = () => {
  if (operator.value && current.value) {
    const currentValue = parseFloat(current.value)
    let result = 0
    
    switch (operator.value) {
      case '+':
        result = previousValue.value + currentValue
        break
      case '-':
        result = previousValue.value - currentValue
        break
      case '*':
        result = previousValue.value * currentValue
        break
      case '/':
        result = previousValue.value / currentValue
        break
    }
    
    history.value = history.value + ' ' + current.value + ' ='
    current.value = result.toString()
    operator.value = ''
    waitingForOperand.value = true
  }
}
</script>

<style scoped>

.basic-calculator {
  max-width: 450px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.calculator-display {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: right;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  border: 2px solid #e9ecef;
  justify-content: flex-end;
}

.history {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
  min-height: 1.2rem;
}

.current {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
}

.calculator-buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}

.btn {
  border: none;
  border-radius: 15px;
  padding: 1rem;
  font-size: clamp(0.9rem, 1.2vw, 1.2rem);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  min-width: 0;
  word-break: keep-all;
  white-space: pre-line;
  line-height: 1.1;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
}

.btn.number {
  background: white;
  color: #333;
}

.btn.operator {
  background: #e3f2fd;
  color: #1976d2;
}

.btn.equals {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn.clear {
  background: #ffebee;
  color: #d32f2f;
}

.btn.zero {
  grid-column: span 2;
}

@media (max-width: 480px) {
  .basic-calculator {
    padding: 0.5rem;
  }
  .calc-topbar {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem 0;
  }
  .btn {
    padding: 0.8rem;
    font-size: 1rem;
  }
}
</style> 