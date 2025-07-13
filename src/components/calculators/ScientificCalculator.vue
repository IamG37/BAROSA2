<template>
  <CalculatorLayout>
    <div class="scientific-calculator">
    <div class="calculator-display">
      <div class="history">{{ history }}</div>
      <div class="current">{{ current || '0' }}</div>
    </div>
    
    <div class="calculator-buttons">
      <!-- 첫 번째 행 -->
      <button @click="clear" class="btn clear">C</button>
      <button @click="backspace" class="btn operator">⌫</button>
      <button @click="setOperator('/')" class="btn operator">÷</button>
      <button @click="setOperator('*')" class="btn operator">×</button>
      
      <!-- 두 번째 행 -->
      <button @click="sin" class="btn function">sin</button>
      <button @click="cos" class="btn function">cos</button>
      <button @click="tan" class="btn function">tan</button>
      <button @click="setOperator('-')" class="btn operator">−</button>
      
      <!-- 세 번째 행 -->
      <button @click="log" class="btn function">log</button>
      <button @click="ln" class="btn function">ln</button>
      <button @click="sqrt" class="btn function">√</button>
      <button @click="setOperator('+')" class="btn operator">+</button>
      
      <!-- 네 번째 행 -->
      <button @click="power" class="btn function">x²</button>
      <button @click="cube" class="btn function">x³</button>
      <button @click="factorial" class="btn function">n!</button>
      <button @click="calculate" class="btn equals">=</button>
      
      <!-- 숫자 패드 -->
      <button @click="appendNumber('7')" class="btn number">7</button>
      <button @click="appendNumber('8')" class="btn number">8</button>
      <button @click="appendNumber('9')" class="btn number">9</button>
      <button @click="pi" class="btn constant">π</button>
      
      <button @click="appendNumber('4')" class="btn number">4</button>
      <button @click="appendNumber('5')" class="btn number">5</button>
      <button @click="appendNumber('6')" class="btn number">6</button>
      <button @click="e" class="btn constant">e</button>
      
      <button @click="appendNumber('1')" class="btn number">1</button>
      <button @click="appendNumber('2')" class="btn number">2</button>
      <button @click="appendNumber('3')" class="btn number">3</button>
      <button @click="toggleSign" class="btn operator">±</button>
      
      <button @click="appendNumber('0')" class="btn number zero">0</button>
      <button @click="appendDecimal" class="btn number">.</button>
      <button @click="percentage" class="btn operator">%</button>
    </div>
    </div>
  </CalculatorLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CalculatorLayout from '../CalculatorLayout.vue'

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

const backspace = () => {
  if (current.value) {
    current.value = current.value.slice(0, -1)
  }
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

// 삼각함수
const sin = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.sin(value * Math.PI / 180).toString()
  }
}

const cos = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.cos(value * Math.PI / 180).toString()
  }
}

const tan = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.tan(value * Math.PI / 180).toString()
  }
}

// 로그함수
const log = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.log10(value).toString()
  }
}

const ln = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.log(value).toString()
  }
}

// 제곱근
const sqrt = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.sqrt(value).toString()
  }
}

// 거듭제곱
const power = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.pow(value, 2).toString()
  }
}

const cube = () => {
  if (current.value) {
    const value = parseFloat(current.value)
    current.value = Math.pow(value, 3).toString()
  }
}

// 팩토리얼
const factorial = () => {
  if (current.value) {
    const value = parseInt(current.value)
    let result = 1
    for (let i = 2; i <= value; i++) {
      result *= i
    }
    current.value = result.toString()
  }
}

// 상수
const pi = () => {
  current.value = Math.PI.toString()
}

const e = () => {
  current.value = Math.E.toString()
}
</script>

<style scoped>
.scientific-calculator {
  max-width: 550px;
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
  justify-content: flex-end;
  border: 2px solid #e9ecef;
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
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
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

.btn.function {
  background: #f3e5f5;
  color: #7b1fa2;
  font-size: 0.9rem;
}

.btn.constant {
  background: #e8f5e8;
  color: #388e3c;
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
  .scientific-calculator {
    padding: 0.5rem;
  }
  
  .btn {
    padding: 0.6rem;
    font-size: 0.8rem;
  }
  
  .btn.function {
    font-size: 0.7rem;
  }
}
</style> 