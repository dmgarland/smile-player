import React from "react"

import { ConfirmSignUp } from "aws-amplify-react"
import { Text, Box, TextField, Heading, Button, Toast } from "gestalt"

class CustomConfirmSignUp extends ConfirmSignUp {
  showComponent(theme) {
    const username = this.usernameFromAuthData()

    return (
      <>
        {this.props.children}
        <Box>
          <Box marginBottom={3}>
            <Heading accessibilityLevel={3} size="sm">
              Confirm your email
            </Heading>
          </Box>
          <Box marginBottom={6}>
            <Text>
              We sent you an email to {username} to verify your account. Please
              enter the code we sent you below.
            </Text>
          </Box>
          <form>
            <Box marginBottom={3}>
              <TextField
                autoFocus={true}
                id="code"
                placeholder="Enter your code"
                label="Confirmation Code"
                type="text"
                name="code"
                onChange={e => {
                  this.handleInputChange(e.event)
                }}
              />
            </Box>
            <Box marginBottom={3} justifyContent="center" display="flex">
              <Button
                inline
                text="Confirm"
                color="blue"
                onClick={this.confirm}
              />
            </Box>
            <Text>
              Lost your code? Didn't get the e-mail?{" "}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.resend()
                }}
              >
                Resend Code
              </a>
            </Text>
          </form>
        </Box>
      </>
    )
  }
}

export default CustomConfirmSignUp
