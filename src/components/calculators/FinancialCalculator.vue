<template>
  <CalculatorLayout>
    <div class="financial-calculator">
    <div class="calculator-section">
      <h3>{{ $t('financialCalculatorTitle') }}</h3>
      
      <!-- 계산 타입 선택 -->
      <div class="calc-type">
        <select v-model="selectedCalc" @change="resetCalculation">
          <option value="loan">{{ $t('loan') }}</option>
          <option value="investment">{{ $t('investment') }}</option>
          <option value="compound">{{ $t('compound') }}</option>
          <option value="mortgage">{{ $t('mortgage') }}</option>
        </select>
      </div>
      
      <!-- 대출 계산기 -->
      <div v-if="selectedCalc === 'loan'" class="calc-form">
        <div class="input-group">
          <label>{{ $t('loanAmountLabel') }}</label>
          <input type="number" v-model="loanAmount" @input="calculateLoan" placeholder="10000000">
        </div>
        <div class="input-group">
          <label>{{ $t('interestRateLabel') }}</label>
          <input type="number" v-model="interestRate" @input="calculateLoan" placeholder="3.5" step="0.1">
        </div>
        <div class="input-group">
          <label>{{ $t('loanTermLabel') }}</label>
          <input type="number" v-model="loanTerm" @input="calculateLoan" placeholder="30">
        </div>
        
        <div class="results" v-if="monthlyPayment">
          <h4>계산 결과</h4>
          <div class="result-item">
            <span>{{ $t('monthlyPaymentLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(monthlyPayment) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('totalPaymentLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(totalPayment) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('totalInterestLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(totalInterest) }}원</span>
          </div>
        </div>
      </div>
      
      <!-- 투자 수익률 계산기 -->
      <div v-if="selectedCalc === 'investment'" class="calc-form">
        <div class="input-group">
          <label>{{ $t('initialInvestmentLabel') }}</label>
          <input type="number" v-model="initialInvestment" @input="calculateInvestment" placeholder="1000000">
        </div>
        <div class="input-group">
          <label>{{ $t('finalAmountLabel') }}</label>
          <input type="number" v-model="finalAmount" @input="calculateInvestment" placeholder="1500000">
        </div>
        <div class="input-group">
          <label>{{ $t('investmentPeriodLabel') }}</label>
          <input type="number" v-model="investmentPeriod" @input="calculateInvestment" placeholder="5">
        </div>
        
        <div class="results" v-if="roi">
          <h4>계산 결과</h4>
          <div class="result-item">
            <span>{{ $t('totalReturnLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(totalReturn) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('roiLabel') }}:</span>
            <span class="result-value">{{ roi.toFixed(2) }}%</span>
          </div>
          <div class="result-item">
            <span>{{ $t('annualizedReturnLabel') }}:</span>
            <span class="result-value">{{ annualizedReturn.toFixed(2) }}%</span>
          </div>
        </div>
      </div>
      
      <!-- 복리 계산기 -->
      <div v-if="selectedCalc === 'compound'" class="calc-form">
        <div class="input-group">
          <label>{{ $t('principalLabel') }}</label>
          <input type="number" v-model="principal" @input="calculateCompound" placeholder="1000000">
        </div>
        <div class="input-group">
          <label>{{ $t('compoundRateLabel') }}</label>
          <input type="number" v-model="compoundRate" @input="calculateCompound" placeholder="5" step="0.1">
        </div>
        <div class="input-group">
          <label>{{ $t('compoundPeriodLabel') }}</label>
          <input type="number" v-model="compoundPeriod" @input="calculateCompound" placeholder="10">
        </div>
        <div class="input-group">
          <label>{{ $t('monthlyContributionLabel') }}</label>
          <input type="number" v-model="monthlyContribution" @input="calculateCompound" placeholder="100000">
        </div>
        
        <div class="results" v-if="compoundResult">
          <h4>계산 결과</h4>
          <div class="result-item">
            <span>{{ $t('finalAmountLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(compoundResult) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('totalContributionLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(totalContribution) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('interestEarnedLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(interestEarned) }}원</span>
          </div>
        </div>
      </div>
      
      <!-- 모기지 계산기 -->
      <div v-if="selectedCalc === 'mortgage'" class="calc-form">
        <div class="input-group">
          <label>{{ $t('housePriceLabel') }}</label>
          <input type="number" v-model="housePrice" @input="calculateMortgage" placeholder="500000000">
        </div>
        <div class="input-group">
          <label>{{ $t('downPaymentPercentLabel') }}</label>
          <input type="number" v-model="downPaymentPercent" @input="calculateMortgage" placeholder="20" step="0.1">
        </div>
        <div class="input-group">
          <label>{{ $t('mortgageRateLabel') }}</label>
          <input type="number" v-model="mortgageRate" @input="calculateMortgage" placeholder="3.5" step="0.1">
        </div>
        <div class="input-group">
          <label>{{ $t('mortgageTermLabel') }}</label>
          <input type="number" v-model="mortgageTerm" @input="calculateMortgage" placeholder="30">
        </div>
        
        <div class="results" v-if="mortgagePayment">
          <h4>계산 결과</h4>
          <div class="result-item">
            <span>{{ $t('downPaymentLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(downPayment) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('mortgageAmountLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(mortgageAmount) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('mortgagePaymentLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(mortgagePayment) }}원</span>
          </div>
          <div class="result-item">
            <span>{{ $t('totalMortgagePaymentLabel') }}:</span>
            <span class="result-value">{{ formatCurrency(totalMortgagePayment) }}원</span>
          </div>
        </div>
      </div>
    </div>
    </div>
  </CalculatorLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import CalculatorLayout from '../CalculatorLayout.vue'
import { useLanguageStore } from '@/stores/language'

const languageStore = useLanguageStore()
const $t = languageStore.t

const selectedCalc = ref('loan')

// 대출 계산 변수
const loanAmount = ref('')
const interestRate = ref('')
const loanTerm = ref('')
const monthlyPayment = ref(0)
const totalPayment = ref(0)
const totalInterest = ref(0)

// 투자 계산 변수
const initialInvestment = ref('')
const finalAmount = ref('')
const investmentPeriod = ref('')
const roi = ref(0)
const totalReturn = ref(0)
const annualizedReturn = ref(0)

// 복리 계산 변수
const principal = ref('')
const compoundRate = ref('')
const compoundPeriod = ref('')
const monthlyContribution = ref('')
const compoundResult = ref(0)
const totalContribution = ref(0)
const interestEarned = ref(0)

// 모기지 계산 변수
const housePrice = ref('')
const downPaymentPercent = ref('')
const mortgageRate = ref('')
const mortgageTerm = ref('')
const downPayment = ref(0)
const mortgageAmount = ref(0)
const mortgagePayment = ref(0)
const totalMortgagePayment = ref(0)

const resetCalculation = () => {
  // 모든 변수 초기화
  loanAmount.value = ''
  interestRate.value = ''
  loanTerm.value = ''
  monthlyPayment.value = 0
  totalPayment.value = 0
  totalInterest.value = 0
  
  initialInvestment.value = ''
  finalAmount.value = ''
  investmentPeriod.value = ''
  roi.value = 0
  totalReturn.value = 0
  annualizedReturn.value = 0
  
  principal.value = ''
  compoundRate.value = ''
  compoundPeriod.value = ''
  monthlyContribution.value = ''
  compoundResult.value = 0
  totalContribution.value = 0
  interestEarned.value = 0
  
  housePrice.value = ''
  downPaymentPercent.value = ''
  mortgageRate.value = ''
  mortgageTerm.value = ''
  downPayment.value = 0
  mortgageAmount.value = 0
  mortgagePayment.value = 0
  totalMortgagePayment.value = 0
}

const calculateLoan = () => {
  if (loanAmount.value && interestRate.value && loanTerm.value) {
    const P = parseFloat(loanAmount.value)
    const r = parseFloat(interestRate.value) / 100 / 12
    const n = parseFloat(loanTerm.value) * 12
    
    if (r > 0) {
      monthlyPayment.value = P * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      totalPayment.value = monthlyPayment.value * n
      totalInterest.value = totalPayment.value - P
    }
  }
}

const calculateInvestment = () => {
  if (initialInvestment.value && finalAmount.value && investmentPeriod.value) {
    const initial = parseFloat(initialInvestment.value)
    const final = parseFloat(finalAmount.value)
    const period = parseFloat(investmentPeriod.value)
    
    totalReturn.value = final - initial
    roi.value = (totalReturn.value / initial) * 100
    annualizedReturn.value = (Math.pow(final / initial, 1 / period) - 1) * 100
  }
}

const calculateCompound = () => {
  if (principal.value && compoundRate.value && compoundPeriod.value) {
    const P = parseFloat(principal.value)
    const r = parseFloat(compoundRate.value) / 100
    const t = parseFloat(compoundPeriod.value)
    const PMT = parseFloat(monthlyContribution.value) || 0
    
    // 초기 금액의 복리
    const initialCompound = P * Math.pow(1 + r, t)
    
    // 월 추가 투자의 복리
    let monthlyCompound = 0
    if (PMT > 0) {
      const monthlyRate = r / 12
      const months = t * 12
      monthlyCompound = PMT * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
    }
    
    compoundResult.value = initialCompound + monthlyCompound
    totalContribution.value = P + (PMT * t * 12)
    interestEarned.value = compoundResult.value - totalContribution.value
  }
}

const calculateMortgage = () => {
  if (housePrice.value && downPaymentPercent.value && mortgageRate.value && mortgageTerm.value) {
    const price = parseFloat(housePrice.value)
    const downPercent = parseFloat(downPaymentPercent.value) / 100
    const rate = parseFloat(mortgageRate.value) / 100 / 12
    const term = parseFloat(mortgageTerm.value) * 12
    
    downPayment.value = price * downPercent
    mortgageAmount.value = price - downPayment.value
    
    if (rate > 0) {
      mortgagePayment.value = mortgageAmount.value * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1)
      totalMortgagePayment.value = mortgagePayment.value * term
    }
  }
}

const formatCurrency = (amount: number): string => {
  return amount.toLocaleString('ko-KR')
}

// 초기화
resetCalculation()
</script>

<style scoped>
.financial-calculator {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.calculator-section h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
}

.calc-type {
  margin-bottom: 1.5rem;
}

.calc-type select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.calc-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-group label {
  font-weight: 600;
  color: #333;
  font-size: 0.9rem;
}

.input-group input {
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1.1rem;
  background: white;
  transition: all 0.3s ease;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
}

.results {
  background: #f8f9fa;
  border-radius: 15px;
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 2px solid #e3f2fd;
  box-shadow: 0 4px 12px rgba(25,118,210,0.1);
}

.results h4 {
  margin-bottom: 1rem;
  color: #1976d2;
  font-size: 1.1rem;
}

.result-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}

.result-item:last-child {
  border-bottom: none;
}

.result-value {
  font-weight: 600;
  color: #1976d2;
  font-size: 1.1rem;
}

@media (max-width: 480px) {
  .financial-calculator {
    padding: 1rem;
  }
  
  .input-group input {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
  
  .result-value {
    font-size: 1rem;
  }
}
</style> 