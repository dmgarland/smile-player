const download = async ({ url, onUpdate }) => {
  const response = await fetch(url)
  const reader = response.body.getReader()
  const contentLength = parseInt(response.headers.get("Content-Length"))

  let received = 0
  let chunks = []
  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    chunks.push(value)
    received += value.length
    onUpdate(received / contentLength)
  }

  let chunksAll = new Uint8Array(received)
  let position = 0
  for (let chunk of chunks) {
    chunksAll.set(chunk, position)
    position += chunk.length
  }

  return chunksAll
}

export default download
