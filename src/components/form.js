import React, { Component } from "react"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import InputGroup from "react-bootstrap/InputGroup"

class TrainingForm extends Component {
  state = {
    formData: {
      nameOfTraining: "",
      numberOfSeries: "",
      numberOfExercises: "",
      nameOfExercises: [],
      exerciseDuration: "",
      restBetweenExercises: "",
      restBetweenSeries: "",
      warmupPeriod: "",
      cooldownPeriod: "",
    },
    validated: false,
  }

  handleSubmit = event => {
    const { formData } = this.state
    const { onSubmit } = this.props
    console.log(formData)
    event.preventDefault()
    const form = event.currentTarget
    if (!form.checkValidity()) {
      event.stopPropagation()
      this.setState({ validated: true })
    } else {
      onSubmit(formData)
      localStorage.setItem(`training-${formData.nameOfTraining}`, JSON.stringify(formData))
    }
  }

  handleChange = event => {
    const { name, value } = event.target

    if (name === "numberOfExercises") {
      return this.setState({
        formData: {
          ...this.state.formData,
          [name]: value,
          nameOfExercises: [...Array(+value).fill("", 0)],
        },
      })
    }

    if (name !== "exerciseDuration" && name.includes("exercise")) {
      const exerciseNumber = name.split("-").pop()
      const newNameOfExercises = this.state.formData.nameOfExercises.slice()
      newNameOfExercises[exerciseNumber] = value

      return this.setState({
        formData: {
          ...this.state.formData,
          nameOfExercises: newNameOfExercises,
        },
      })
    }

    this.setState({
      formData: {
        ...this.state.formData,
        [name]: value,
      },
    })
  }

  render() {
    const {
      formData: {
        nameOfTraining,
        numberOfSeries,
        numberOfExercises,
        nameOfExercises,
        exerciseDuration,
        restBetweenExercises,
        restBetweenSeries,
        warmupPeriod,
        cooldownPeriod,
      },
    } = this.state

    return (
      <>
        <h1>Create a timer</h1>
        <Form
          noValidate
          validated={this.state.validated}
          onSubmit={this.handleSubmit}
        >
          <Row>
            <Col xs={6}>
              <Form.Group controlId="nameOfTraining">
                <Form.Label>Name of the training</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. HIIT core"
                  value={nameOfTraining}
                  name="nameOfTraining"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter a name for the training
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="numberOfSeries">
                <Form.Label>Number of series</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. 3"
                  value={numberOfSeries}
                  name="numberOfSeries"
                  onChange={this.handleChange}
                />{" "}
                <Form.Control.Feedback type="invalid">
                  Please enter the number of series
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="exerciseDuration">
                <Form.Label>Exercise duration (secs)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. 60"
                  value={exerciseDuration}
                  name="exerciseDuration"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of seconds
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="restBetweenExercises">
                <Form.Label>Rest between exercises (secs)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. 15"
                  value={restBetweenExercises}
                  name="restBetweenExercises"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of seconds
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="restBetweenSeries">
                <Form.Label>Rest between series (secs)</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. 60"
                  value={restBetweenSeries}
                  name="restBetweenSeries"
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of seconds
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="warmupPeriod">
                <Form.Label>Warmup (secs)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. 60"
                  value={warmupPeriod}
                  name="warmupPeriod"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">Optional</Form.Text>
              </Form.Group>
              <Form.Group controlId="cooldownPeriod">
                <Form.Label>Cooldown (secs)</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ex. 120"
                  value={cooldownPeriod}
                  name="cooldownPeriod"
                  onChange={this.handleChange}
                />
                <Form.Text className="text-muted">Optional</Form.Text>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group controlId="numberOfExercises">
                <Form.Label>Number of exercises</Form.Label>
                <Form.Control
                  required
                  type="text"
                  placeholder="Ex. 8"
                  name="numberOfExercises"
                  value={numberOfExercises}
                  onChange={this.handleChange}
                />
                <Form.Control.Feedback type="invalid">
                  Please enter the number of exercises
                </Form.Control.Feedback>
              </Form.Group>

              {numberOfExercises.length > 0 && (
                <Form.Group controlId="numberOfExercises">
                  <Form.Label>Name of exercises</Form.Label>
                  {[...Array(+numberOfExercises)].map((e, i) => (
                    <InputGroup key={i} style={{ marginBottom: "4px" }}>
                      <InputGroup.Prepend>
                        <InputGroup.Text>{i + 1}</InputGroup.Text>
                      </InputGroup.Prepend>
                      <Form.Control
                        type="text"
                        placeholder="Ex. Planks"
                        name={`exercise-${i}`}
                        value={nameOfExercises[i]}
                        onChange={this.handleChange}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        Please enter a name for the exercise
                      </Form.Control.Feedback>
                    </InputGroup>
                  ))}
                </Form.Group>
              )}
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Create timer!
          </Button>
        </Form>
      </>
    )
  }
}

export default TrainingForm
