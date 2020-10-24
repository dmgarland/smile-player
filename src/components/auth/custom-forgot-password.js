import React from "react"

import { ForgotPassword } from "aws-amplify-react"
import { Text, Box, TextField, Heading, Button, Toast, Divider } from "gestalt"

class CustomForgotPassword extends ForgotPassword {
  showComponent(theme) {
    const { authState, hide, authData = {} } = this.props

    const resetView = (
      <>
        <Box marginBottom={3}>
          <Heading accessibilityLevel={3} size="sm">
            Reset your password
          </Heading>
        </Box>
        <Box marginBottom={6}>
          <Text>
            If you can't recall your password, enter your e-mail address and
            we'll send you instructions on how to reset your account.
          </Text>
        </Box>
        <form>
          <Box marginBottom={3}>
            <TextField
              id="email"
              placeholder="Email"
              label="Email"
              type="email"
              name="username"
              autoFocus={true}
              onChange={e => {
                this.handleInputChange(e.event)
              }}
            />
          </Box>

          <Box marginBottom={3} justifyContent="center" display="flex">
            <Button inline text="Send Code" color="blue" onClick={this.send} />
          </Box>

          <Box marginBottom={3}>
            <Text>
              Back to{" "}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.changeState("signIn")
                }}
              >
                Sign In
              </a>
            </Text>
          </Box>
        </form>
      </>
    )

    const setPasswordView = (
      <>
        <Box marginBottom={3}>
          <Heading accessibilityLevel={3} size="sm">
            Choose a new password
          </Heading>
        </Box>
        <form>
          <Box marginBottom={3}>
            <TextField
              id="code"
              placeholder="Code"
              label="Code"
              type="text"
              name="code"
              autoFocus={true}
              onChange={e => {
                this.handleInputChange(e.event)
              }}
            />
          </Box>
          <Box marginBottom={3}>
            <TextField
              id="password"
              placeholder="New Password"
              label="New Password"
              type="password"
              name="password"
              onChange={e => {
                this.handleInputChange(e.event)
              }}
            />
          </Box>
          <Box marginBottom={6} justifyContent="center" display="flex">
            <Button
              inline
              text="Reset Password"
              color="blue"
              onClick={this.submit}
            />
          </Box>
          <Divider />

          <Box paddingY={3}>
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
          </Box>
        </form>
      </>
    )

    const view =
      this.state.delivery || authData.username ? setPasswordView : resetView

    return (
      <>
        {this.props.children}
        {view}
      </>
    )
  }
}

export default CustomForgotPassword
