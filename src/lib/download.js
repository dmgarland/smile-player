const download = async ({ url, setProgress }) => {
  const response = await fetch(url)
  const reader = response.body.getReader()

  // Step 2: get total length
  const contentLength = parseInt(response.headers.get("Content-Length"))

  // Step 3: read the data
  let received = 0 // received that many bytes at the moment
  let chunks = [] // array of received binary chunks (comprises the body)
  while (true) {
    const { done, value } = await reader.read()

    if (done) {
      break
    }

    chunks.push(value)
    received += value.length

    setProgress((received / contentLength).toFixed(0))
  }

  // Step 4: concatenate chunks into single Uint8Array
  let chunksAll = new Uint8Array(received) // (4.1)
  let position = 0
  for (let chunk of chunks) {
    chunksAll.set(chunk, position) // (4.2)
    position += chunk.length
  }

  // Step 5: decode into a string
  let result = new TextDecoder("utf-8").decode(chunksAll)

  // We're done!
  let commits = JSON.parse(result)
  alert(commits[0].author.login)
}

export default download
