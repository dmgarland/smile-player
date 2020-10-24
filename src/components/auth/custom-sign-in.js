import React from "react"
import { SignIn } from "aws-amplify-react"
import { Text, Box, TextField, Heading, Button, Toast, Divider } from "gestalt"

class CustomSignIn extends SignIn {
  showComponent(theme) {
    return (
      <>
        {this.props.children}
        <Box marginBottom={3}>
          <Heading accessibilityLevel={3} size="sm">
            Sign In
          </Heading>
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
          <Box marginBottom={6} justifyContent="center" display="flex">
            <Button
              inline
              text="Sign In"
              color="blue"
              onClick={() => this.signIn()}
              disabled={this.state.loading}
            />
          </Box>

          <Divider />
          <Box paddingY={3}>
            <Text>
              Don't have an account?{" "}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.changeState("signUp")
                }}
              >
                Click here to Sign Up
              </a>
            </Text>
          </Box>
          <Box marginBottom={3}>
            <Text>
              Forgot your password?{" "}
              <a
                href=""
                onClick={e => {
                  e.preventDefault()
                  this.changeState("forgotPassword")
                }}
              >
                Reset your password
              </a>
            </Text>
          </Box>
        </form>
      </>
    )
  }
}

export default CustomSignIn
