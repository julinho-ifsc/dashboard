const path = require('path')
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(morgan(':date[iso] :method :url :status - :response-time ms'))
app.use('/static', express.static('public/static'))

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}!`)
})
