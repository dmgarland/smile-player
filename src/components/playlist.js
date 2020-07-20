import React from "react"

import { Box } from "gestalt"
import PlaylistRow from "./playlist-row"

const Playlist = ({ playlist, height, current_id }) => (
  <Box height={height} overflow="scrollY" position="relative">
    {playlist.map(item => (
      <PlaylistRow
        key={item.public_id}
        {...item}
        active={item.public_id === current_id}
      />
    ))}
  </Box>
)

export default Playlist
