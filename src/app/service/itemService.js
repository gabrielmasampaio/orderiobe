const itemRepository = require("../repository/itemRepository")

class ItemService {

  saveItem(item){
    if(item._id) {
      return itemRepository.updateItem(item)
          .then((updatedItem) => updatedItem)
          .catch((error) => {
            console.error('Error updating item: ', error)
            throw error;
          })
    } else {
      return itemRepository.createNewItem(item)
          .then((createdItem) => createdItem)
          .catch((error) => {
            console.error('Error updating item: ', error)
            throw error;
          })
    }
  }

  getItemById(id){
    return itemRepository.getItemById(id)
        .then( existingItem => {
          return existingItem;
        })
        .catch((error) => {
          console.error('Error finding item', error)
          throw error
        })
  }

  getAllItems(){
    return itemRepository.getAllItems()
        .then((items) => {
          return items;
        })
        .catch((err) => {
          console.error('Error getting items: ', err)
          throw err;
        })
  }

  findItems(query){
    return itemRepository.getItemByQuery(query)
        .then((items) => {
          return items;
        })
        .catch((error) => {
          console.error('Error finding items: ', error)
          throw error;
        })
  }

  deleteItem(itemId) {
    return itemRepository.deleteItem(itemId)
        .then((item) => {
          return item;
        })
        .catch((error) => {
          console.error("Error deleting item: ", error)
          throw error;
        })
  }

}

module.exports = new ItemService()