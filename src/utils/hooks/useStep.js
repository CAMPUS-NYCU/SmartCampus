import { useState, useCallback } from 'react'

const useStep = ({ initialStep = 0, maxStep = null, minStep = 0 } = {}) => {
  const [step, setStep] = useState(initialStep)
  const handleNext = useCallback(
    (stepNum) =>
      setStep((prevStep) => {
        if (maxStep && prevStep >= maxStep) return prevStep
        return prevStep + stepNum
      }),
    [maxStep]
  )
  const handleBack = useCallback(
    (stepNum) =>
      setStep((prevStep) => {
        if (minStep && prevStep <= minStep) return prevStep
        return prevStep - stepNum
      }),
    [minStep]
  )
  return {
    step,
    setStep,
    handleNext,
    handleBack
  }
}

export default useStep
