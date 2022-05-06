'use strict';
// NPM modules
const express = require('express')
const serverless = require('serverless-http')

const app = express()
const router = express.Router()

const products = require('../dist/data/products.json')

function getProductsAsync (data) {
  return new Promise(resolve => resolve(data))
}
/**
 * Middlewares 
 */
// parse application/json
app.use(express.json())
app.use('/api/v1', router)

/**
 * Routes 
 */
router.get('/greeting', async (req, res) => {
  try {
    res.json({
      message: 'Hello!'
    })
  } catch (error) {
    console.log(error) // !DEBUG
  }
})


router.get('/products', async (req, res) => {
  try {
    const data = await getProductsAsync(products)
    res.status(200).json(data)
  } catch (error) {
    console.log(error) // !DEBUG
  }
})

router.get('/products/:id', async (req, res) => {
  try {
    const id = req.params.id
    let data = await getProductsAsync(products)
    data = data.filter(product => product.id === id)[0]
    if(data) return res.json(data)
    const status = 404
    res.status(status).json({
      message: `no product found with the :id of '${id}'`,
      code: status
    })
  } catch (error) {
    console.log(error) // !DEBUG
  }
})

router.get('/home', (req, res) => {
  res.redirect('/')
})

module.exports.handler = serverless(app)