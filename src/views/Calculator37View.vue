<template>
  <div class="calculator37">
    <header>
      <nav>
        <div class="logo">
          <i class="fas fa-calculator"></i>
          <span>Calculator37</span>
        </div>
        <div class="nav-links">
          <a href="#basic" class="nav-link" :class="{ active: activeSection === 'basic' }" @click="setActiveSection('basic')">{{ $t('nav.basic') }}</a>
          <a href="#scientific" class="nav-link" :class="{ active: activeSection === 'scientific' }" @click="setActiveSection('scientific')">{{ $t('nav.scientific') }}</a>
          <a href="#unit" class="nav-link" :class="{ active: activeSection === 'unit' }" @click="setActiveSection('unit')">{{ $t('nav.unit') }}</a>
          <a href="#finance" class="nav-link" :class="{ active: activeSection === 'finance' }" @click="setActiveSection('finance')">{{ $t('nav.finance') }}</a>
        </div>
        <div class="home-link">
          <router-link to="/" class="home-button" :title="$t('nav.home')">
            <i class="fas fa-home"></i>
            <span>{{ $t('nav.home') }}</span>
          </router-link>
        </div>
        <div class="language-selector">
          <select :value="currentLanguage" @change="(event) => changeLanguage((event.target as HTMLSelectElement).value)">
            <option value="ko">🇰🇷 한국어</option>
            <option value="en">🇺🇸 English</option>
            <option value="ja">🇯🇵 日本語</option>
            <option value="zh">🇨🇳 中文</option>
            <option value="es">🇪🇸 Español</option>
            <option value="fr">🇫🇷 Français</option>
            <option value="de">🇩🇪 Deutsch</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="pt">🇧🇷 Português</option>
            <option value="it">🇮🇹 Italiano</option>
          </select>
        </div>
      </nav>
    </header>

    <main>
      <!-- SEO를 위한 메인 제목 -->
      <h1 style="display: none;">Calculator37 - 무료 온라인 계산기</h1>
      
      <!-- 광고 배너 -->
      <div class="ad-banner" id="ad-banner">
        <!-- 광고 placeholder 관련 코드 전체 삭제 -->
      </div>

      <!-- 기본 계산기 섹션 -->
      <section id="basic" class="calculator-section" :class="{ active: activeSection === 'basic' }">
        <h2><i class="fas fa-calculator"></i> <span>{{ $t('calculator.basic.title') }}</span></h2>
        <p class="section-description">{{ $t('calculator.basic.description') }}</p>
        <div class="calculator-container">
          <div class="calculator">
            <div class="display">
              <div class="previous-operand" id="previous-operand">{{ previousOperand }}</div>
              <div class="current-operand" id="current-operand">{{ currentOperand }}</div>
            </div>
            <div class="buttons">
              <button class="btn clear" @click="clearAll">AC</button>
              <button class="btn operator" @click="deleteLast">⌫</button>
              <button class="btn operator" @click="appendOperator('%')">%</button>
              <button class="btn operator" @click="appendOperator('÷')">÷</button>
              
              <button class="btn number" @click="appendNumber('7')">7</button>
              <button class="btn number" @click="appendNumber('8')">8</button>
              <button class="btn number" @click="appendNumber('9')">9</button>
              <button class="btn operator" @click="appendOperator('×')">×</button>
              
              <button class="btn number" @click="appendNumber('4')">4</button>
              <button class="btn number" @click="appendNumber('5')">5</button>
              <button class="btn number" @click="appendNumber('6')">6</button>
              <button class="btn operator" @click="appendOperator('-')">-</button>
              
              <button class="btn number" @click="appendNumber('1')">1</button>
              <button class="btn number" @click="appendNumber('2')">2</button>
              <button class="btn number" @click="appendNumber('3')">3</button>
              <button class="btn operator" @click="appendOperator('+')">+</button>
              
              <button class="btn number zero" @click="appendNumber('0')">0</button>
              <button class="btn number" @click="appendDecimal">.</button>
              <button class="btn equals" @click="calculate">=</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 공학용 계산기 섹션 -->
      <section id="scientific" class="calculator-section" :class="{ active: activeSection === 'scientific' }">
        <h2><i class="fas fa-microscope"></i> <span>{{ $t('calculator.scientific.title') }}</span></h2>
        <p class="section-description">{{ $t('calculator.scientific.description') }}</p>
        <div class="calculator-container">
          <div class="scientific-calculator">
            <div class="display">
              <div class="previous-operand" id="sci-previous-operand">{{ sciPreviousOperand }}</div>
              <div class="current-operand" id="sci-current-operand">{{ sciCurrentOperand }}</div>
            </div>
            <div class="buttons">
              <button class="btn function" @click="scientificFunction('sin')">sin</button>
              <button class="btn function" @click="scientificFunction('cos')">cos</button>
              <button class="btn function" @click="scientificFunction('tan')">tan</button>
              <button class="btn clear" @click="clearScientific">AC</button>
              
              <button class="btn function" @click="scientificFunction('log')">log</button>
              <button class="btn function" @click="scientificFunction('ln')">ln</button>
              <button class="btn function" @click="scientificFunction('sqrt')">√</button>
              <button class="btn operator" @click="appendScientificOperator('^')">^</button>
              
              <button class="btn number" @click="appendScientificNumber('7')">7</button>
              <button class="btn number" @click="appendScientificNumber('8')">8</button>
              <button class="btn number" @click="appendScientificNumber('9')">9</button>
              <button class="btn operator" @click="appendScientificOperator('÷')">÷</button>
              
              <button class="btn number" @click="appendScientificNumber('4')">4</button>
              <button class="btn number" @click="appendScientificNumber('5')">5</button>
              <button class="btn number" @click="appendScientificNumber('6')">6</button>
              <button class="btn operator" @click="appendScientificOperator('×')">×</button>
              
              <button class="btn number" @click="appendScientificNumber('1')">1</button>
              <button class="btn number" @click="appendScientificNumber('2')">2</button>
              <button class="btn number" @click="appendScientificNumber('3')">3</button>
              <button class="btn operator" @click="appendScientificOperator('-')">-</button>
              
              <button class="btn number" @click="appendScientificNumber('0')">0</button>
              <button class="btn number" @click="appendScientificDecimal">.</button>
              <button class="btn equals" @click="calculateScientific">=</button>
              <button class="btn operator" @click="appendScientificOperator('+')">+</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 단위 변환 섹션 -->
      <section id="unit" class="calculator-section" :class="{ active: activeSection === 'unit' }">
        <h2><i class="fas fa-exchange-alt"></i> <span>{{ $t('calculator.unit.title') }}</span></h2>
        <p class="section-description">{{ $t('calculator.unit.description') }}</p>
        <div class="unit-converter">
          <div class="converter-group">
            <label for="unit-type">{{ $t('unit.converter.type') }}</label>
            <select id="unit-type" v-model="unitType" @change="changeUnitType">
              <option value="length">{{ $t('unit.types.length') }}</option>
              <option value="weight">{{ $t('unit.types.weight') }}</option>
              <option value="temperature">{{ $t('unit.types.temperature') }}</option>
              <option value="area">{{ $t('unit.types.area') }}</option>
              <option value="volume">{{ $t('unit.types.volume') }}</option>
            </select>
          </div>
          
          <div class="converter-inputs">
            <div class="input-group">
              <input type="number" v-model="fromValue" @input="convertUnit" :placeholder="$t('unit.input.placeholder')">
              <select v-model="fromUnit">
                <option v-for="unit in fromUnits" :key="unit" :value="unit">{{ unit }}</option>
              </select>
            </div>
            <div class="swap-btn" @click="swapUnits" :title="$t('unit.converter.type')">
              <i class="fas fa-exchange-alt"></i>
            </div>
            <div class="input-group">
              <input type="number" v-model="toValue" readonly>
              <select v-model="toUnit" @change="convertUnit">
                <option v-for="unit in toUnits" :key="unit" :value="unit">{{ unit }}</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      <!-- 금융 계산기 섹션 -->
      <section id="finance" class="calculator-section" :class="{ active: activeSection === 'finance' }">
        <h2><i class="fas fa-chart-line"></i> 금융 계산기</h2>
        <p class="section-description">이자 계산과 대출 상환금 계산을 도와드립니다.</p>
        <div class="finance-calculators">
          <div class="finance-calc">
            <h3>이자 계산기</h3>
            <div class="input-group">
              <label>원금 (원)</label>
              <input type="number" v-model="principal" placeholder="1000000">
            </div>
            <div class="input-group">
              <label>이율 (%)</label>
              <input type="number" v-model="rate" placeholder="5.0" step="0.1">
            </div>
            <div class="input-group">
              <label>기간 (년)</label>
              <input type="number" v-model="time" placeholder="1">
            </div>
            <div class="result" v-if="interestResult">
              이자: {{ interestResult }}원
            </div>
            <button class="cta-button" @click="calculateInterest">이자 계산</button>
          </div>
          
          <div class="finance-calc">
            <h3>대출 상환금 계산기</h3>
            <div class="input-group">
              <label>대출금액 (원)</label>
              <input type="number" v-model="loanAmount" placeholder="10000000">
            </div>
            <div class="input-group">
              <label>연이율 (%)</label>
              <input type="number" v-model="loanRate" placeholder="3.5" step="0.1">
            </div>
            <div class="input-group">
              <label>상환기간 (년)</label>
              <input type="number" v-model="loanPeriod" placeholder="20">
            </div>
            <div class="result" v-if="monthlyPayment">
              월 상환금: {{ monthlyPayment }}원
            </div>
            <button class="cta-button" @click="calculateLoan">상환금 계산</button>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()

const currentLanguage = computed(() => languageStore.currentLanguage)
const $t = languageStore.t

const changeLanguage = (lang: string) => {
  languageStore.changeLanguage(lang)
}

// 계산기 상태
const activeSection = ref('basic')
const previousOperand = ref('')
const currentOperand = ref('0')
const sciPreviousOperand = ref('')
const sciCurrentOperand = ref('0')

// 단위 변환 상태
const unitType = ref('length')
const fromValue = ref(0)
const toValue = ref(0)
const fromUnit = ref('')
const toUnit = ref('')

// 금융 계산 상태
const principal = ref(1000000)
const rate = ref(5.0)
const time = ref(1)
const interestResult = ref('')
const loanAmount = ref(10000000)
const loanRate = ref(3.5)
const loanPeriod = ref(20)
const monthlyPayment = ref('')

// 단위 변환 데이터
const unitData = {
  length: {
    units: ['미터', '킬로미터', '센티미터', '밀리미터', '인치', '피트', '야드', '마일'],
    conversions: {
      '미터': 1,
      '킬로미터': 1000,
      '센티미터': 0.01,
      '밀리미터': 0.001,
      '인치': 0.0254,
      '피트': 0.3048,
      '야드': 0.9144,
      '마일': 1609.344
    }
  },
  weight: {
    units: ['킬로그램', '그램', '밀리그램', '파운드', '온스'],
    conversions: {
      '킬로그램': 1,
      '그램': 0.001,
      '밀리그램': 0.000001,
      '파운드': 0.453592,
      '온스': 0.0283495
    }
  },
  temperature: {
    units: ['섭씨', '화씨', '켈빈'],
    conversions: {}
  }
}

const fromUnits = computed(() => unitData[unitType.value as keyof typeof unitData]?.units || [])
const toUnits = computed(() => unitData[unitType.value as keyof typeof unitData]?.units || [])

// 기본 계산기 함수들
const clearAll = () => {
  previousOperand.value = ''
  currentOperand.value = '0'
}

const deleteLast = () => {
  currentOperand.value = currentOperand.value.slice(0, -1)
  if (currentOperand.value === '') currentOperand.value = '0'
}

const appendNumber = (number: string) => {
  if (currentOperand.value === '0') {
    currentOperand.value = number
  } else {
    currentOperand.value += number
  }
}

const appendDecimal = () => {
  if (!currentOperand.value.includes('.')) {
    currentOperand.value += '.'
  }
}

const appendOperator = (operator: string) => {
  if (currentOperand.value !== '') {
    previousOperand.value = currentOperand.value + ' ' + operator
    currentOperand.value = ''
  }
}

const calculate = () => {
  if (previousOperand.value !== '' && currentOperand.value !== '') {
    const prev = parseFloat(previousOperand.value)
    const current = parseFloat(currentOperand.value)
    const operator = previousOperand.value.split(' ')[1]
    
    let result = 0
    switch (operator) {
      case '+': result = prev + current; break
      case '-': result = prev - current; break
      case '×': result = prev * current; break
      case '÷': result = prev / current; break
      case '%': result = prev % current; break
    }
    
    currentOperand.value = result.toString()
    previousOperand.value = ''
  }
}

// 공학용 계산기 함수들
const clearScientific = () => {
  sciPreviousOperand.value = ''
  sciCurrentOperand.value = '0'
}

const appendScientificNumber = (number: string) => {
  if (sciCurrentOperand.value === '0') {
    sciCurrentOperand.value = number
  } else {
    sciCurrentOperand.value += number
  }
}

const appendScientificDecimal = () => {
  if (!sciCurrentOperand.value.includes('.')) {
    sciCurrentOperand.value += '.'
  }
}

const appendScientificOperator = (operator: string) => {
  if (sciCurrentOperand.value !== '') {
    sciPreviousOperand.value = sciCurrentOperand.value + ' ' + operator
    sciCurrentOperand.value = ''
  }
}

const scientificFunction = (func: string) => {
  const value = parseFloat(sciCurrentOperand.value)
  let result = 0
  
  switch (func) {
    case 'sin': result = Math.sin(value * Math.PI / 180); break
    case 'cos': result = Math.cos(value * Math.PI / 180); break
    case 'tan': result = Math.tan(value * Math.PI / 180); break
    case 'log': result = Math.log10(value); break
    case 'ln': result = Math.log(value); break
    case 'sqrt': result = Math.sqrt(value); break
  }
  
  sciCurrentOperand.value = result.toString()
}

const calculateScientific = () => {
  if (sciPreviousOperand.value !== '' && sciCurrentOperand.value !== '') {
    const prev = parseFloat(sciPreviousOperand.value)
    const current = parseFloat(sciCurrentOperand.value)
    const operator = sciPreviousOperand.value.split(' ')[1]
    
    let result = 0
    switch (operator) {
      case '+': result = prev + current; break
      case '-': result = prev - current; break
      case '×': result = prev * current; break
      case '÷': result = prev / current; break
      case '^': result = Math.pow(prev, current); break
    }
    
    sciCurrentOperand.value = result.toString()
    sciPreviousOperand.value = ''
  }
}

// 단위 변환 함수들
const changeUnitType = () => {
  if (fromUnits.value.length > 0) {
    fromUnit.value = fromUnits.value[0]
    toUnit.value = fromUnits.value[1] || fromUnits.value[0]
  }
  convertUnit()
}

const convertUnit = () => {
  if (unitType.value === 'temperature') {
    convertTemperature()
  } else {
    convertStandard()
  }
}

const convertStandard = () => {
  if (!fromValue.value || !fromUnit.value || !toUnit.value) return
  
  const conversions = unitData[unitType.value as keyof typeof unitData]?.conversions
  if (!conversions) return
  
  const fromConversion = conversions[fromUnit.value as keyof typeof conversions]
  const toConversion = conversions[toUnit.value as keyof typeof conversions]
  
  if (fromConversion && toConversion) {
    const baseValue = fromValue.value * fromConversion
    toValue.value = baseValue / toConversion
  }
}

const convertTemperature = () => {
  if (!fromValue.value || !fromUnit.value || !toUnit.value) return
  
  let celsius = 0
  
  // 입력값을 섭씨로 변환
  switch (fromUnit.value) {
    case '섭씨': celsius = fromValue.value; break
    case '화씨': celsius = (fromValue.value - 32) * 5/9; break
    case '켈빈': celsius = fromValue.value - 273.15; break
  }
  
  // 섭씨를 목표 단위로 변환
  switch (toUnit.value) {
    case '섭씨': toValue.value = celsius; break
    case '화씨': toValue.value = celsius * 9/5 + 32; break
    case '켈빈': toValue.value = celsius + 273.15; break
  }
}

const swapUnits = () => {
  const temp = fromUnit.value
  fromUnit.value = toUnit.value
  toUnit.value = temp
  convertUnit()
}

// 금융 계산 함수들
const calculateInterest = () => {
  const p = principal.value
  const r = rate.value / 100
  const t = time.value
  
  const interest = p * r * t
  interestResult.value = interest.toLocaleString()
}

const calculateLoan = () => {
  const p = loanAmount.value
  const r = loanRate.value / 100 / 12
  const n = loanPeriod.value * 12
  
  const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  monthlyPayment.value = Math.round(monthly).toLocaleString()
}

// 섹션 변경
const setActiveSection = (section: string) => {
  activeSection.value = section
}

onMounted(() => {
  // 초기 단위 설정
  if (fromUnits.value.length > 0) {
    fromUnit.value = fromUnits.value[0]
    toUnit.value = fromUnits.value[1] || fromUnits.value[0]
  }
})
</script>

<style scoped>
/* 계산기 네비게이션 스타일 */
nav {
  background: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #667eea;
}

.nav-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-link {
  color: #333;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.nav-link:hover,
.nav-link.active {
  background: #667eea;
  color: white;
}

.home-link {
  margin-left: auto;
}

.home-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 25px;
  transition: all 0.3s ease;
  background: #f8f9fa;
}

.home-button:hover {
  background: #667eea;
  color: white;
}

.language-selector select {
  padding: 0.5rem;
  border: 1px solid #e9ecef;
  border-radius: 5px;
  background: white;
}

main {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.ad-banner {
  margin-bottom: 2rem;
  text-align: center;
}

/* 반응형 디자인 */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    text-align: center;
  }
  
  .nav-links {
    justify-content: center;
  }
  
  .home-link {
    margin-left: 0;
  }
  
  main {
    padding: 1rem;
  }
}
</style> 