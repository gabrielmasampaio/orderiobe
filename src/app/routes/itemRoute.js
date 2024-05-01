const express = require('express')
const itemRoute = express.Router()
const itemController = require('../controller/ItemController')

itemRoute.get('/item',
    //addMiddleware,
    itemController.getItems)

itemRoute.get('/item/:id',
    //addMiddleware
    itemController.getItems)



//Auth needed
itemRoute.post('/item',
    //add AuthMiddleware,
    itemController.postItem)

itemRoute.put('/item',
    //add AuthMiddleware
    itemController.putItem)

itemRoute.delete('/item',
    //add AuthMiddleware
    itemController.deleteItem)


module.exports = itemRoute