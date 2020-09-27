import { useState } from 'react'

const useStep = ({ initialStep = 0, maxStep = null, minStep = 0 } = {}) => {
  const [step, setStep] = useState(initialStep)
  const handleNext = (stepNum) =>
    setStep((prevStep) => {
      if (maxStep && prevStep >= maxStep) return prevStep
      return prevStep + stepNum
    })
  const handleBack = (stepNum) =>
    setStep((prevStep) => {
      if (minStep && prevStep <= minStep) return prevStep
      return prevStep - stepNum
    })
  return {
    step,
    setStep,
    handleNext,
    handleBack
  }
}

export default useStep
