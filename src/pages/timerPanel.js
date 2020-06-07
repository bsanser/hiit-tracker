import React from "react"
import Timer from "./../components/timer"

const TimerPanel = () => {
  return (
    <div>
      <div>Current exercise: [nameOfCurrentExercise] </div>
      <Timer minutes={20} seconds={10} />
      <div>
        Serie: <span>[Current series]/[NumberOfSeries]</span>
      </div>
      <div>
        {" "}
        Exercise: <span>[CurrentExercise]/[NumberOfExercises]</span>
      </div>
      <div>Next: [Name of following exercise]</div>
      <div>
        Total Elapsed: [Time that has happened since the beginning - now - ]
      </div>
      <div>Total Remaining: [Time remaining the beginning]</div>
    </div>
  )
}

export default TimerPanel
