export const generateExerciseStructure = formData => {
  const {
    numberOfSeries,
    numberOfExercises,
    nameOfExercises,
    exerciseDuration,
    restBetweenExercises,
    restBetweenSeries,
    warmupPeriod,
    cooldownPeriod,
  } = formData

  let exerciseStructure = []

  if (warmupPeriod !== 0) {
    exerciseStructure.push({ name: "Warmup", duration: +warmupPeriod })
  }

  const exercisesWithDurationArray = nameOfExercises.reduce((acc, curr, i) => {
    if (i < numberOfExercises - 1) {
      return acc.concat(
        { name: curr, duration: +exerciseDuration },
        { name: "Rest", duration: +restBetweenExercises }
      )
    }
    return acc.concat({ name: curr, duration: +exerciseDuration })
  }, [])

  for (let i = 0; i < numberOfSeries; i++) {
    exerciseStructure = exerciseStructure.concat(exercisesWithDurationArray)
    if (i < numberOfSeries - 1) {
      exerciseStructure.push({
        name: "Rest between series",
        duration: +restBetweenSeries,
      })
    }
  }

  if (cooldownPeriod !== 0) {
    exerciseStructure.push({ name: "Cooldown", duration: +cooldownPeriod })
  }

  return exerciseStructure
}

export const getTotalTrainingDuration = exerciseStructure =>
  exerciseStructure.map(c => c.duration).reduce((acc, curr) => acc + curr, 0)

export const getAllSavedTrainings = () => {
  let savedTrainings = []
  const trainingKeysSaved = Object.keys(localStorage).filter(key =>
    key.includes("training")
  )

  for (let key of trainingKeysSaved) {
    savedTrainings.push(JSON.parse(localStorage[key]))
  }
  return savedTrainings
}
