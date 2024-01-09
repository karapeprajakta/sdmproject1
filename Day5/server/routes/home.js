const express = require('express')
const db = require('../db')
const utils = require('../utils')

// import multer
const multer = require('multer')

// define the location where the files will get uplaoded
const upload = multer({ dest: 'uploads' })

const router = express.Router()

// upload an image
router.post(
  '/upload-image/:id',
  upload.single('photo'),
  (request, response) => {
    const { id } = request.params

    // request.file is added by multer
    const filename = request.file.filename

    // update the home with the image
    const statement = `
      UPDATE home
      SET image = ?
      WHERE id = ?
    `

    db.pool.query(statement, [filename, id], (error, result) => {
      response.send(utils.createResult(error, result))
    })
  }
)

// used for creating a new home
router.post('/host', (request, response) => {
  const {
    type,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state,
    zipcode,
    guests,
    beds,
    bedRooms,
    bathRooms,
    title,
    tagLine,
    shortDescription,
    longDescription,
    rent,
    cleaningFees,
    serviceFee,
    tax,
  } = request.body

  const statement = `
    INSERT INTO home
        (   type, addressLine1, addressLine2, addressLine3, city, state, zipCode,
            guests, beds, bedrooms, bathrooms, title, tagline, shortDescription,
            longDescription, rent, cleaningFees, serviceFee, tax, userId )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `
  const values = [
    type,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    state,
    zipcode,
    guests,
    beds,
    bedRooms,
    bathRooms,
    title,
    tagLine,
    shortDescription,
    longDescription,
    rent,
    cleaningFees,
    serviceFee,
    tax,
    request.userId,
  ]

  db.pool.query(statement, values, (error, result) => {
    if (error) {
      // if there is any error while executing the query to create hom
      response.send(utils.createError(error))
    } else if (!result) {
      // if the result is null/undefined
      response.send(utils.createError('error while hosting home'))
    } else {
      // this means the home got successfully created and
      // now lets add the amenities for the home

      // get the id of newly inserted record
      const homeId = result.insertId

      // when the new home gets created, all the amenities will be set to 0
      const statementAmenities = `
            INSERT INTO amenity (homeId) values (?) 
        `
      db.pool.query(statementAmenities, [homeId], (error, result) => {
        response.send(utils.createResult(error, result))
      })
    }
  })
})

// used for updating amenities for a home
router.put('/amenities/:homeId', (request, response) => {
  const { homeId } = request.params
  const {
    swimmingPool,
    hotTub,
    patio,
    bbqGrill,
    poolTable,
    outdoorDiningArea,
    wifi,
    tv,
    kitchen,
    washingMachine,
    freeParking,
    paidParking,
    ac,
    workspace,
    outdoorShower,
    smokeAlarm,
    firstAidKit,
    fireAlarm,
  } = request.body

  const statement = `
    UPDATE amenity 
    SET
        swimmingPool = ?,
        hotTub = ?,
        patio = ?,
        bbqGrill = ?,
        poolTable = ?,
        outdoorDiningArea = ?,
        wifi = ?,
        tv = ?,
        kitchen = ?,
        washingMachine = ?,
        freeParking = ?,
        paidParking = ?,
        ac = ?,
        workspace = ?,
        outdoorShower = ?,
        smokeAlarm = ?,
        firstAidKit = ?,
        fireAlarm = ?
    WHERE
        homeId = ?
  `
  const values = [
    swimmingPool,
    hotTub,
    patio,
    bbqGrill,
    poolTable,
    outdoorDiningArea,
    wifi,
    tv,
    kitchen,
    washingMachine,
    freeParking,
    paidParking,
    ac,
    workspace,
    outdoorShower,
    smokeAlarm,
    firstAidKit,
    fireAlarm,
    homeId,
  ]
  db.pool.query(statement, values, (error, result) => {
    response.send(utils.createResult(error, result))
  })
})

// used to get all the homes
router.get('/', async (request, response) => {
  const statement = `
        SELECT id, title, tagline, shortDescription, rent, image
        FROM home
    `

  // wait till the promise is over
  const [result] = await db.poolAsync.execute(statement)

  if (!request.userId) {
    // as the user has not yet logged in just send all the homes without
    // the wishlist status
    response.send(utils.createSuccess(result))
  } else {
    const homes = []

    // iterate the home one by one
    for (const home of result) {
      // create a new copy of the home
      const newHome = { ...home }

      // for every home check if the home is in the current user's wishlist
      const statementWishlist = `
      SELECT count(*) as count 
      FROM wishlist
      WHERE homeId = ? AND userId = ?
    `

      // wait for every home's wishlist status
      const [wishlistResult] = await db.poolAsync.execute(statementWishlist, [
        home.id,
        request.userId,
      ])

      // get the wishlist status
      newHome.wishlistStatus = wishlistResult[0].count == 0 ? false : true

      // add the copy to the collection
      homes.push(newHome)
    }

    // return the homes collection to the client
    response.send(utils.createSuccess(homes))
  }
})

// used to search homes
router.get('/search/:text', async (request, response) => {
  const { text } = request.params

  const statement = `
        SELECT id, title, tagline, shortDescription, rent, image
        FROM home
        WHERE title like '%${text}%'
    `

  // wait till the promise is over
  const [result] = await db.poolAsync.execute(statement)
  response.send(utils.createSuccess(result))
})

// used to details of selected home
router.get('/details/:id', (request, response) => {
  const { id } = request.params
  const statement = `
        SELECT *
        FROM home
        WHERE
          id = ?
    `
  db.pool.query(statement, [id], (error, homes) => {
    if (homes.length === 0) {
      response.send(utils.createError('no home found'))
    } else {
      // send only the required home's details as an object
      // instead of sending as an array
      response.send(utils.createResult(error, homes[0]))
    }
  })
})

// used to get all the homes of a user
router.get('/my', (request, response) => {
  const statement = `
          SELECT id, title, tagline, shortDescription, rent
          FROM home
          WHERE
            userId = ?
    `
  db.pool.query(statement, [request.userId], (error, homes) => {
    response.send(utils.createResult(error, homes))
  })
})

// used to delete a home created by the user
router.delete('/:id', (request, response) => {
  const { id } = request.params

  const statement = `
          DELETE FROM home
          WHERE
            userId = ? AND
            id = ?
    `
  db.pool.query(statement, [request.userId, id], (error, homes) => {
    response.send(utils.createResult(error, homes))
  })
})

module.exports = router
