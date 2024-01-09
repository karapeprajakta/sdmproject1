const express = require('express')
const config = require('./config')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const utils = require('./utils')

const app = express()
app.use(express.json())
app.use(cors())

// this route will be used to getting the images
// generally known as static route
// this means new route is not needed for any files inside uploads directory
app.use(express.static('uploads'))

// add middleware to extract token
app.use((request, response, next) => {
  if (request.url === '/user/signup' || request.url === '/user/signin') {
    next()
  } else {
    const token = request.headers['token']

    // now the home may get a token or may not
    if (request.url == '/home/' && request.method == 'GET') {
      if (token == 'undefined') {
        next()
        return
      }
    }

    if (!token || token.length === 0) {
      response.send(utils.createResult('token is missing'))
    } else {
      try {
        // extract the user id from token
        const payload = jwt.verify(token, config.secret)

        // add the userid to the request so that
        // all the other requests can use it
        request.userId = payload.id

        next()
      } catch (ex) {
        response.send(utils.createResult('invalid token'))
      }
    }
  }
})

// add the routes
const userRouter = require('./routes/user')
const homeRouter = require('./routes/home')
const wishlistRouter = require('./routes/wishlist')

app.use('/user', userRouter)
app.use('/home', homeRouter)
app.use('/wishlist', wishlistRouter)

app.listen(4000, '0.0.0.0', () => {
  console.log('server started on port 4000')
})
