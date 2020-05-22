import { useState } from 'react'

const useStep = ({ initialStep = 0, maxStep = null, minStep = 0 } = {}) => {
  const [step, setStep] = useState(initialStep)
  const handleNext = () =>
    setStep((prevStep) => {
      if (maxStep && prevStep >= maxStep) return prevStep
      return prevStep + 1
    })
  const handleBack = () =>
    setStep((prevStep) => {
      if (minStep && prevStep <= minStep) return prevStep
      return prevStep - 1
    })
  return {
    step,
    setStep,
    handleNext,
    handleBack
  }
}

export default useStep
