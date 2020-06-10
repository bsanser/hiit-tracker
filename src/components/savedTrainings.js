import React from "react"
import Button from "react-bootstrap/Button"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Accordion from "react-bootstrap/Accordion"
import Card from "react-bootstrap/Card"

import "./../styles/saved-trainings.css"

const SavedTrainingItem = ({
  training,
  onDeleteSavedTraining,
  onStartSavedTraining,
  totalTrainingDuration,
}) => {
  const {
    nameOfTraining,
    numberOfSeries,
    numberOfExercises,
    nameOfExercises,
    exerciseDuration,
    restBetweenExercises,
    restBetweenSeries,
    warmupPeriod,
    cooldownPeriod,
  } = training
  return (
    <Card>
      <Accordion.Toggle as={Card.Header} eventKey={nameOfTraining}>
        <strong>
          {training.nameOfTraining} - Total duration: {totalTrainingDuration}{" "}
        </strong>
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={nameOfTraining}>
        <Card.Body>
          <Row>
            <Col>
              <ul>
                <li>
                  <strong>Number of series:</strong> {numberOfSeries}
                </li>
                <li>
                  <strong>Name of exercises:</strong> {nameOfExercises}
                </li>
                <li>
                  <strong>Duration of exercises:</strong> {exerciseDuration}{" "}
                  secs
                </li>
              </ul>
            </Col>
            <Col>
              <ul>
                <li>
                  <strong>Rest between exercises:</strong>{" "}
                  {restBetweenExercises} secs
                </li>
                <li>
                  <strong>Rest between series:</strong> {restBetweenSeries} secs
                </li>
                <li>
                  <strong>Warmup period:</strong>
                  {warmupPeriod.length > 0 ? warmupPeriod + "secs" : "none"}
                </li>
                <li>
                  <strong>Cooldown period:</strong>
                  {cooldownPeriod.length > 0
                    ? cooldownPeriod + "secs"
                    : "none"}{" "}
                </li>
              </ul>
            </Col>
          </Row>
          <Row className="buttons-row">
            <Button
              variant="success"
              onClick={() => onStartSavedTraining(nameOfTraining)}
            >
              Start this training
            </Button>
            <Button
              variant="danger"
              onClick={() => onDeleteSavedTraining(nameOfTraining)}
            >
              Delete this training
            </Button>
          </Row>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  )
}

const SavedTrainings = ({
  savedTrainings,
  onDeleteSavedTraining,
  onStartSavedTraining,
  totalTrainingDuration,
}) => {
  return (
    <Accordion defaultActiveKey="0">
      <h1>Repeat previously saved trainings:</h1>
      {savedTrainings.map((training, i) => (
        <SavedTrainingItem
          key={i}
          training={training}
          index={i}
          onDeleteSavedTraining={onDeleteSavedTraining}
          onStartSavedTraining={onStartSavedTraining}
          totalTrainingDuration={totalTrainingDuration}
        />
      ))}
    </Accordion>
  )
}

export default SavedTrainings
