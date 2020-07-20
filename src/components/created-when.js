import React from "react"
import { Text } from "gestalt"

const CreatedWhen = ({ week, created_at }) => {
  const createdWhen = []
  if (week) createdWhen.push(`Session ${week}`)
  if (created_at) createdWhen.push(created_at)
  const createdWhenLabel = createdWhen.join(" - ")
  return (
    <Text color="gray" italic>
      {createdWhenLabel}
    </Text>
  )
}

export default CreatedWhen
