<template>
  <CalculatorLayout>
    <div class="unit-calculator">
    <div class="converter-section">
      <h3>{{ $t('unitConverterTitle') }}</h3>
      
      <!-- 변환 타입 선택 -->
      <div class="converter-type">
        <select v-model="selectedType" @change="resetConversion">
          <option value="length">{{ $t('length') }}</option>
          <option value="weight">{{ $t('weight') }}</option>
          <option value="temperature">{{ $t('temperature') }}</option>
          <option value="area">{{ $t('area') }}</option>
          <option value="volume">{{ $t('volume') }}</option>
          <option value="speed">{{ $t('speed') }}</option>
        </select>
      </div>
      
      <!-- 변환 입력/출력 -->
      <div class="conversion-inputs">
        <div class="input-group">
          <input 
            type="number" 
            v-model="fromValue" 
            @input="convert"
            :placeholder="$t('enterValue')"
            class="value-input"
          >
          <select v-model="fromUnit" @change="convert" class="unit-select">
            <option v-for="unit in getUnits()" :key="unit" :value="unit">{{ $t(unit) }}</option>
          </select>
        </div>
        
        <div class="swap-button" @click="swapUnits">
          ⇄
        </div>
        
        <div class="input-group">
          <input 
            type="number" 
            v-model="toValue" 
            readonly
            :placeholder="$t('result')"
            class="value-input result"
          >
          <select v-model="toUnit" @change="convert" class="unit-select">
            <option v-for="unit in getUnits()" :key="unit" :value="unit">{{ $t(unit) }}</option>
          </select>
        </div>
      </div>
    </div>
    
    <!-- 빠른 변환 버튼들 -->
    <div class="quick-conversions">
      <h4>{{ $t('quickConversions') }}</h4>
      <div class="quick-buttons">
        <button 
          v-for="quick in getQuickConversions()" 
          :key="quick.label"
          @click="quickConvert(quick)"
          class="quick-btn"
        >
          {{ quick.label }}
        </button>
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

const selectedType = ref('length')
const fromValue = ref('')
const toValue = ref('')
const fromUnit = ref('')
const toUnit = ref('')

// 단위 정의
const units = {
  length: ['unit.meter', 'unit.kilometer', 'unit.centimeter', 'unit.millimeter', 'unit.inch', 'unit.foot', 'unit.yard', 'unit.mile'],
  weight: ['unit.gram', 'unit.kilogram', 'unit.milligram', 'unit.ton', 'unit.pound', 'unit.ounce'],
  temperature: ['unit.celsius', 'unit.fahrenheit', 'unit.kelvin'],
  area: ['unit.squareMeter', 'unit.squareKilometer', 'unit.squareCentimeter', 'unit.hectare', 'unit.acre', 'unit.squareFoot'],
  volume: ['unit.liter', 'unit.milliliter', 'unit.cubicMeter', 'unit.gallon', 'unit.pint', 'unit.quart'],
  speed: ['unit.meterPerSecond', 'unit.kilometerPerHour', 'unit.milesPerHour', 'unit.knot', 'unit.feetPerSecond']
}

// 변환 계수 (간단한 예시)
const conversionFactors: Record<string, Record<string, number|string>> = {
  length: {
    'unit.meter': 1,
    'unit.kilometer': 1000,
    'unit.centimeter': 0.01,
    'unit.millimeter': 0.001,
    'unit.inch': 0.0254,
    'unit.foot': 0.3048,
    'unit.yard': 0.9144,
    'unit.mile': 1609.344
  },
  weight: {
    'unit.gram': 1,
    'unit.kilogram': 1000,
    'unit.milligram': 0.001,
    'unit.ton': 1000000,
    'unit.pound': 453.592,
    'unit.ounce': 28.3495
  },
  temperature: {
    'unit.celsius': 'celsius',
    'unit.fahrenheit': 'fahrenheit',
    'unit.kelvin': 'kelvin'
  }
}

const getUnits = () => {
  return units[selectedType.value as keyof typeof units] || []
}

const resetConversion = () => {
  const unitsList = getUnits()
  fromUnit.value = unitsList[0]
  toUnit.value = unitsList[1] || unitsList[0]
  fromValue.value = ''
  toValue.value = ''
}

const convert = () => {
  if (!fromValue.value || !fromUnit.value || !toUnit.value) {
    toValue.value = ''
    return
  }
  
  const value = parseFloat(fromValue.value)
  
  if (selectedType.value === 'temperature') {
    toValue.value = convertTemperature(value, fromUnit.value, toUnit.value).toString()
  } else {
    const fromFactor = conversionFactors[selectedType.value as keyof typeof conversionFactors]?.[fromUnit.value as keyof typeof conversionFactors[typeof selectedType.value]]
    const toFactor = conversionFactors[selectedType.value as keyof typeof conversionFactors]?.[toUnit.value as keyof typeof conversionFactors[typeof selectedType.value]]
    
    if (fromFactor && toFactor) {
      const result = (value * parseFloat(fromFactor as string)) / parseFloat(toFactor as string)
      toValue.value = result.toFixed(6).replace(/\.?0+$/, '')
    }
  }
}

const convertTemperature = (value: number, from: string, to: string): number => {
  let celsius = 0
  
  // 입력값을 섭씨로 변환
  switch (from) {
    case 'unit.celsius':
      celsius = value
      break
    case 'unit.fahrenheit':
      celsius = (value - 32) * 5/9
      break
    case 'unit.kelvin':
      celsius = value - 273.15
      break
  }
  
  // 섭씨에서 목표 단위로 변환
  switch (to) {
    case 'unit.celsius':
      return celsius
    case 'unit.fahrenheit':
      return celsius * 9/5 + 32
    case 'unit.kelvin':
      return celsius + 273.15
    default:
      return celsius
  }
}

const swapUnits = () => {
  const tempUnit = fromUnit.value
  const tempValue = fromValue.value
  
  fromUnit.value = toUnit.value
  toUnit.value = tempUnit
  fromValue.value = toValue.value
  toValue.value = tempValue
}

const getQuickConversions = () => {
  const quickConversions = {
    length: [
      { label: `${fromValue.value}${$t(fromUnit.value)} → ${$t(toUnit.value)}`, fromValue: fromValue.value, fromUnit: fromUnit.value, toUnit: toUnit.value },
      { label: `${$t(toUnit.value)} → ${fromValue.value}${$t(fromUnit.value)}`, fromValue: fromValue.value, fromUnit: toUnit.value, toUnit: fromUnit.value },
      { label: `${fromValue.value}${$t(fromUnit.value)} → ${$t(toUnit.value)}`, fromValue: fromValue.value, fromUnit: fromUnit.value, toUnit: toUnit.value }
    ],
    weight: [
      { label: `${fromValue.value}${$t(fromUnit.value)} → ${$t(toUnit.value)}`, fromValue: fromValue.value, fromUnit: fromUnit.value, toUnit: toUnit.value },
      { label: `${$t(toUnit.value)} → ${fromValue.value}${$t(fromUnit.value)}`, fromValue: fromValue.value, fromUnit: toUnit.value, toUnit: fromUnit.value }
    ],
    temperature: [
      { label: `${fromValue.value}${$t(fromUnit.value)} → ${$t(toUnit.value)}`, fromValue: fromValue.value, fromUnit: fromUnit.value, toUnit: toUnit.value },
      { label: `${$t(toUnit.value)} → ${fromValue.value}${$t(fromUnit.value)}`, fromValue: fromValue.value, fromUnit: toUnit.value, toUnit: fromUnit.value }
    ]
  }
  
  return quickConversions[selectedType.value as keyof typeof quickConversions] || []
}

const quickConvert = (quick: any) => {
  fromValue.value = quick.fromValue.toString()
  fromUnit.value = quick.fromUnit
  toUnit.value = quick.toUnit
  convert()
}

// 초기화
resetConversion()
</script>

<style scoped>
.unit-calculator {
  max-width: 700px;
  margin: 0 auto;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.1);
  border: 1px solid #e0e0e0;
}

.converter-section h3 {
  text-align: center;
  margin-bottom: 2rem;
  color: #333;
  font-size: 2rem;
  font-weight: 700;
}

.converter-type {
  margin-bottom: 1.5rem;
}

.converter-type select {
  width: 100%;
  padding: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 15px;
  font-size: 1.1rem;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
}

.conversion-inputs {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.input-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.value-input {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
}

.value-input.result {
  background: #f0f8ff;
  color: #1976d2;
  font-weight: 600;
}

.unit-select {
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 10px;
  font-size: 1rem;
  background: white;
  cursor: pointer;
}

.swap-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: all 0.3s ease;
}

.swap-button:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 15px rgba(102,126,234,0.3);
}

.quick-conversions h4 {
  margin-bottom: 1rem;
  color: #333;
  font-size: 1.2rem;
}

.quick-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.quick-btn {
  background: white;
  border: 2px solid #e0e0e0;
  padding: 0.6rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #666;
}

.quick-btn:hover {
  border-color: #667eea;
  color: #667eea;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .conversion-inputs {
    flex-direction: column;
    gap: 1rem;
  }
  
  .swap-button {
    align-self: center;
  }
  
  .quick-buttons {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .unit-calculator {
    padding: 1rem;
  }
  
  .value-input,
  .unit-select {
    padding: 0.6rem;
    font-size: 0.9rem;
  }
}
</style> 