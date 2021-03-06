import { useState, useEffect } from "react"
import { useInterval } from "../hooks/useInterval"
import { getTotalTrainingDuration } from "../utils/trainingStructureUtils"

export const useExerciseTimer = initialExerciseStructure => {
  const [index, setIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [delay, setDelay] = useState(null)
  const [exerciseStructure, setExerciseStructure] = useState(
    initialExerciseStructure
  )
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showPauseButton, setShowPauseButton] = useState(false)
  const [totalTrainingDuration, setTotalTrainingDuration] = useState(0)

  useEffect(() => {
    if (exerciseStructure.length > 0) {
      setTotalTrainingDuration(getTotalTrainingDuration(exerciseStructure));
    }
    if (index < exerciseStructure.length)
      setTimeLeft(exerciseStructure[index].duration)
  }, [index, exerciseStructure])

  useInterval(() => {
    if (timeLeft <= 0) {
      if (index >= exerciseStructure.length - 1) {
        setDelay(null)
        return
      }
      setIndex(index + 1)
    }
    setTimeLeft(timeLeft - 1)
  }, delay)

  const onStartButtonClick = () => {
    setDelay(1000)
    setIsTimerRunning(true)
    setShowPauseButton(true)
  }

  return {
    index,
    setIndex,
    timeLeft,
    setTimeLeft,
    delay,
    setDelay,
    isTimerRunning,
    setIsTimerRunning,
    exerciseStructure,
    setExerciseStructure,
    onStartButtonClick,
    showPauseButton,
    totalTrainingDuration
  }
}
