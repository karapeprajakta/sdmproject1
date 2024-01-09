const express = require('express')
const db = require('../db')
const utils = require('../utils')

const router = express.Router()

// get all my wishlist items
router.get('/', (request, response) => {
  const statement = `
        SELECT home.id, title, tagline, shortDescription, rent, image
        FROM home, wishlist
        WHERE wishlist.homeId = home.id AND wishlist.userId = ?
    `
  db.pool.query(statement, [request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

// add a home in wishlist
router.post('/:homeId', (request, response) => {
  const { homeId } = request.params

  const statement = `
        INSERT INTO wishlist (homeId, userId) VALUES (?, ?)
    `
  db.pool.query(statement, [homeId, request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

// add a home in wishlist
router.delete('/:homeId', (request, response) => {
  const { homeId } = request.params

  const statement = `
        DELETE FROM wishlist 
        WHERE homeId = ? AND userId = ?
    `
  db.pool.query(statement, [homeId, request.userId], (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

module.exports = router
