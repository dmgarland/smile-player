import React from "react"
import { TextField, SelectList, Label, Row, Text, Box } from "gestalt"
import { countryDialCodes } from "./country-dial-codes"

const defaultDialCode = "+44"

class CustomPhoneField extends React.Component {
  static defaultProps = {
    defaultDialCode
  }
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.composePhoneNumber = this.composePhoneNumber.bind(this)

    this.state = {
      dial_code: this.props.defaultDialCode || defaultDialCode,
      phone_line_number: ""
    }
  }

  composePhoneNumber(dial_code, phone_line_number) {
    return `${dial_code || defaultDialCode}${phone_line_number.replace(
      /[-()]/g,
      ""
    )}`
  }

  handleInputChange(evt) {
    const { name, value } = evt.target
    const update = {}
    update[name] = value
    this.setState({ ...this.state, ...update })

    if (this.props.onChangeText) {
      this.props.onChangeText(
        this.composePhoneNumber(
          this.state.dial_code,
          this.state.phone_line_number
        )
      )
    }
  }
  render() {
    return (
      <>
        <Box marginBottom={2}>
          <Label htmlFor="phone_line_number">
            <Text size="sm">Phone Number</Text>
          </Label>
        </Box>
        <Row gap={1}>
          <SelectList
            id="dial_code"
            name="dial_code"
            value={this.state.dial_code}
            onChange={({ event }) => this.handleInputChange(event)}
            options={countryDialCodes.map(dialCode => ({
              value: dialCode,
              label: dialCode
            }))}
          />
          <TextField
            placeholder="Phone Number"
            name="phone_line_number"
            id="phone_line_number"
            onChange={({ event }) => this.handleInputChange(event)}
          />
        </Row>
      </>
    )
  }
}

export default CustomPhoneField
