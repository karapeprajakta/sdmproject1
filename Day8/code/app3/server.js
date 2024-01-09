const express = require('express')

const app = express()

app.get('/', (request, response) => {
  response.send('response from container :)')
})

app.get('/test', (request, response) => {
  response.send('test response from container :)')
})

app.listen(3000, '0.0.0.0', () => {
  console.log(`server started on port 3000`)
})
