import React from "react"
import { Link } from "gatsby"
import { SignUp, PhoneField } from "aws-amplify-react"
import CustomPhoneField from "./custom-phone-field"
import {
  Text,
  Box,
  TextField,
  Heading,
  Button,
  Toast,
  Checkbox,
  Divider
} from "gestalt"
import Privacy from "../privacy"

class CustomSignUp extends SignUp {
  constructor(props) {
    super(props)
    // this._validAuthStates = ["signUp"];
    this.signUpFields = [
      {
        label: "Name",
        key: "name",
        required: true,
        type: "string",
        displayOrder: 1
      },
      {
        label: "Username",
        key: "email",
        required: true,
        placeholder: "Email",
        type: "email",
        displayOrder: 2
      },
      {
        label: "Password",
        key: "password",
        required: true,
        placeholder: "Password",
        type: "password",
        displayOrder: 3
      }
    ]

    this.careHomeFields = [
      {
        label: "Name of Care Home",
        key: "custom:institution",
        component: TextField
      },
      {
        label: "Address 1",
        key: "custom:address1",
        component: TextField
      },
      {
        label: "Address 2",
        key: "custom:address2",
        component: TextField
      },
      {
        label: "County",
        key: "custom:county",
        component: TextField
      },
      {
        label: "Post Code",
        key: "custom:postcode",
        component: TextField
      },
      {
        label: "Country",
        key: "custom:country",
        component: TextField
      }
    ]
  }

  validate() {
    let invalids = super.validate()
    var _this = this
    if (this.state.showCareHomeFields) {
      invalids = invalids.concat(
        this.careHomeFields
          .filter(field => !_this.inputs[field.key])
          .map(field => field.label)
      )
    }

    if (!this.state.tcs_agreed) {
      invalids.push("Terms and Conditions")
    }
    return invalids
  }

  needPrefix(key) {
    return false
  }

  handleInputChange(evt) {
    this.inputs = this.inputs || {}
    const { name, value, type, checked } = evt.target
    const check_type = ["radio", "checkbox"].includes(type)
    this.inputs[name] = check_type ? "" + checked : value
    this.inputs["checkedValue"] = check_type ? value : null
  }

  showComponent(theme) {
    return (
      <Box>
        {this.props.children}
        <Box>
          <Box marginBottom={3}>
            <Heading accesibilityLevel={3} size="sm">
              Register for Free
            </Heading>
          </Box>
          <Box marginBottom={3}>
            <TextField
              id="name"
              autoFocus="true"
              placeholder="Name"
              label="Name"
              theme={theme}
              name="name"
              key="name"
              onChange={e => this.handleInputChange(e.event)}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              id="email"
              placeholder="Email"
              label="Email"
              type="email"
              name="email"
              onChange={e => {
                this.handleInputChange(e.event)
              }}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              id="password"
              placeholder="Password"
              label="Password"
              type="password"
              name="password"
              onChange={e => {
                this.handleInputChange(e.event)
              }}
            />
          </Box>
          <Box marginBottom={3}>
            <CustomPhoneField onChangeText={this.onPhoneNumberChanged} />
          </Box>
          {this.state.showPrivacy && (
            <Box
              height={300}
              overflow="scrollY"
              borderStyle="sm"
              padding={3}
              marginBottom={3}
            >
              <Heading size="sm" accessibilityLevel={3}>
                Privacy and Data Protection Policy
              </Heading>
              <Privacy />
            </Box>
          )}
          <Box marginBottom={3}>
            <Checkbox
              id="tcs_agreed"
              name="custom:tcs_agreed"
              label={
                <Text>
                  I agree for my data to be processed in accordance with our{" "}
                  <a
                    href="/privacy"
                    onClick={e => {
                      e.preventDefault()
                      this.setState({ showPrivacy: !this.state.showPrivacy })
                    }}
                  >
                    privacy policy
                  </a>
                </Text>
              }
              onChange={({ event, checked }) => {
                this.setState({ tcs_agreed: checked })
                this.handleInputChange(event)
              }}
              checked={this.state.tcs_agreed}
            />
          </Box>
          <Box marginBottom={3}>
            <Checkbox
              id="care-home-form"
              label="I represent a care home"
              checked={this.state.showCareHomeFields}
              onChange={({ event, checked }) =>
                this.setState({
                  showCareHomeFields: checked
                })
              }
            />
          </Box>
          {this.state.showCareHomeFields &&
            this.careHomeFields.map(({ component: Component, label, key }) => (
              <Box marginBottom={3} key={key}>
                <Component
                  label={label}
                  id={key}
                  name={key}
                  placeholder={label}
                  onChange={e => this.handleInputChange(e.event)}
                  theme={theme}
                />
              </Box>
            ))}
          <Box marginBottom={6} justifyContent="center" display="flex">
            <Button
              inline
              disabled={this.state.requestPending}
              onClick={() => this.signUp()}
              color="blue"
              text="Sign Up"
            />
          </Box>
          <Divider />
          <Box paddingY={3}>
            <Text>
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.changeState("signIn")
                }}
              >
                Sign In
              </a>{" "}
              if you already have an account
            </Text>
          </Box>
        </Box>
      </Box>
    )
  }
}

export default CustomSignUp
