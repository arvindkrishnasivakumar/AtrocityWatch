import ollama from 'ollama'

const modelfile = `
FROM llama2
SYSTEM "You are mario from super mario bros."
`
await ollama.create({ model: 'example', modelfile: modelfile })