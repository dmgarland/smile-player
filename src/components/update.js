import React, { useState, useEffect } from "react"
import { Text, Toast, Layer, Box, Button } from "gestalt"

const Update = () => {
  const [showToast, setShowToast] = useState(false)
  useEffect(() => {
    window.swUpdateShowToast = setShowToast
  }, [])

  return (
    <Layer>
      <Box
        fit
        dangerouslySetInlineStyle={{
          __style: {
            bottom: 50,
            left: "50%",
            transform: "translateX(-50%)"
          }
        }}
        padding={1}
        position="fixed"
      >
        {showToast && (
          <Toast
            text={
              <Text inline color="white">
                An update is available
              </Text>
            }
            button={
              <Button
                textColor="white"
                color="blue"
                inline
                text="Update"
                onClick={() => {
                  window.location.reload()
                }}
                size="lg"
              />
            }
          />
        )}
      </Box>
    </Layer>
  )
}

export const ServiceWorkerUpdateContext = React.createContext()
export default Update
