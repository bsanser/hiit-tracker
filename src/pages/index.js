import React, { useState, useEffect } from "react"

import Layout from "../components/layout"
import Form from "../components/form"
import SEO from "../components/seo"
import "bootstrap/dist/css/bootstrap.min.css"

import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import PlayListPlayer from "../components/playlistPlayer"
import SavedTrainings from "../components/savedTrainings"
import TimerPanel from "./timerPanel"
import { useExerciseTimer } from "../hooks/useExerciseTimer"
import {
  generateExerciseStructure,
  getAllSavedTrainings,
} from "../utils/trainingStructureUtils"

const IndexPage = () => {
  const [isTimerCreated, setIsTimerCreated] = useState(false)
  const [formData, setFormData] = useState({})
  const [playlistUrl, setPlaylistUrl] = useState(null)
  const [savedTrainings, setSavedTrainings] = useState([])
  const exerciseTimer = useExerciseTimer([])

  const handleTogglePauseClick = () => {
    if (exerciseTimer.delay === null) {
      exerciseTimer.setDelay(1000)
      exerciseTimer.setIsTimerRunning(true)
    } else {
      exerciseTimer.setDelay(null)
      exerciseTimer.setIsTimerRunning(false)
    }
  }

  const handleFormSubmit = formData => {
    setFormData(formData)
    setIsTimerCreated(true)
    exerciseTimer.setExerciseStructure(generateExerciseStructure(formData))
  }

  const handleDeleteSavedTraining = name => {
    const remainingTrainings = savedTrainings.filter(
      training => training["nameOfTraining"] !== name
    )
    localStorage.removeItem(`training-${name}`)
    setSavedTrainings(remainingTrainings)
  }

  const handleStartSavedTraining = name => {
    const savedTrainingSelected = savedTrainings.filter(
      training => training["nameOfTraining"] === name
    )[0]
    setIsTimerCreated(true)
    exerciseTimer.setExerciseStructure(
      generateExerciseStructure(savedTrainingSelected)
    )
  }

  useEffect(() => {
    setSavedTrainings(getAllSavedTrainings)
    console.log(exerciseTimer.totalTrainingDuration)
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      <Container>
        <Row>
          <Col xs={12} md={8}>
            {!isTimerCreated && <Form onSubmit={handleFormSubmit} />}

            {isTimerCreated && (
              <div>
                {/* https://open.spotify.com/embed/playlist/37i9dQZF1DXbeUHEkt5uXG */}
                {/* <PlayListPlayer playlistUrl={playListUrl} /> */}
              </div>
            )}
          </Col>

          <Col xs={12} md={8}>
            {savedTrainings.length > 0 && !isTimerCreated && (
              <SavedTrainings
                savedTrainings={savedTrainings}
                onDeleteSavedTraining={handleDeleteSavedTraining}
                onStartSavedTraining={handleStartSavedTraining}
                totalTrainingDuration={useExerciseTimer.totalTrainingDuration}
              />
            )}
            {isTimerCreated && <TimerPanel {...exerciseTimer} />}
            {isTimerCreated && exerciseTimer.showPauseButton && (
              <Button onClick={handleTogglePauseClick}>
                {exerciseTimer.isTimerRunning ? "Pause" : "Resume"}
              </Button>
            )}
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default IndexPage
