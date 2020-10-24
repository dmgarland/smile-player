import React from "react"
import "@aws-amplify/ui/dist/style.css"
import {
  ConfirmSignIn,
  RequireNewPassword,
  VerifyContact,
  withAuthenticator
} from "aws-amplify-react"
import {
  CustomSignIn,
  CustomSignUp,
  CustomConfirmSignUp,
  CustomForgotPassword
} from "./auth"
import Amplify, { Auth, Hub } from "aws-amplify"
import awsConfig from "../aws-exports"

Amplify.configure(awsConfig)

const Wrapper = props => {
  const { component: Component } = props
  return <Component {...props} />
}

const amplifyComponents = [
  <CustomSignIn />,
  <ConfirmSignIn />,
  <VerifyContact />,
  <CustomSignUp />,
  <CustomConfirmSignUp />,
  <CustomForgotPassword />,
  <RequireNewPassword />
]

const includeGreetings = false
const federated = null
const signUpConfig = {
  hiddenDefaults: ["email", "phone_number"],
  defaultCountryCode: "+44",
  signUpFields: [
    {
      label: "Name",
      key: "name",
      required: true,
      type: "string",
      displayOrder: 1
    },
    {
      label: "Email",
      key: "username",
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
    },
    {
      label: "Phone Number",
      key: "phone_number",
      required: false,
      placeholder: "Phone Number",
      type: "phone_number",
      displayOrder: 4
    },
    {
      label: "If you represent a care home, please tell us the name here",
      key: "institution",
      required: false,
      placeholder: "Name of Care Home",
      type: "text",
      displayOrder: 5,
      custom: true
    }
  ]
}

const theme = {
  toast: {
    position: "fixed",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Helvetica, ヒラギノ角ゴ Pro W3, Hiragino Kaku Gothic Pro, メイリオ, Meiryo, ＭＳ Ｐゴシック, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol"
  }
}

export default withAuthenticator(
  Wrapper,
  includeGreetings,
  amplifyComponents,
  federated,
  theme,
  signUpConfig
)
