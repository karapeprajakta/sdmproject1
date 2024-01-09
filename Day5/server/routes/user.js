const express = require('express')
const db = require('../db')
const utils = require('../utils')
const cryptoJs = require('crypto-js')
const config = require('../config')
const jwt = require('jsonwebtoken')

const router = express.Router()

router.post('/signup', (request, response) => {
  const { firstName, lastName, email, password, phone } = request.body

  const encryptedPassword = String(cryptoJs.MD5(password))
  const statement = `
    INSERT INTO user
        (firstName, lastName, email, password, phone)
    VALUES (?, ?, ?, ?, ?)
  `
  db.pool.query(
    statement,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      response.send(utils.createResult(error, result))
    }
  )
})

router.post('/signin', (request, response) => {
  const { email, password } = request.body

  const encryptedPassword = String(cryptoJs.MD5(password))
  const statement = `
      SELECT id, firstName, lastName, email 
      FROM user
      WHERE email = ? and password = ?
    `
  db.pool.query(statement, [email, encryptedPassword], (error, users) => {
    const result = {}
    if (error) {
      result['status'] = 'error'
      result['error'] = error
    } else if (users.length === 0) {
      result['status'] = 'error'
      result['error'] = 'user not found'
    } else {
      // get the first user from the array
      const user = users[0]
      const payload = { id: user['id'] }
      const token = jwt.sign(payload, config.secret)

      result['status'] = 'success'
      result['data'] = {
        name: `${user['firstName']} ${user['lastName']}`,
        email: user['email'],
        token,
      }
    }

    response.send(result)
  })
})

module.exports = router
