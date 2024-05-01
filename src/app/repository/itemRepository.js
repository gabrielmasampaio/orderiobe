const Item = require('../model/Item')

class ItemRepository {

  async updateItem(item){
    try {
       return await Item.findByIdAndUpdate(item._id, item, {new: true});
     } catch (err) {
       console.error('Error saving item: ', err)
       throw err;
     }
  }

  async createNewItem(item){
    try {
      return await Item.create(item);
    } catch (err) {
      console.error('Error creating item: ', err)
      throw err;
    }
  }

  async deleteItem(itemId){
    try{
      return await Item.findByIdAndDelete(itemId)
    } catch (err) {
      console.error('Error deleting item: ', err)
      throw err;
    }
  }

  async getItemById(itemId){
    try{
      return await Item.findById(itemId)
    } catch (err) {
      console.error('Error finding item: ', err)
      throw err
    }
  }

  async getAllItems(){
    try{
        return await Item.find({});
    } catch (err) {
      console.error('Error getting item: ', err)
      throw err;
    }
  }

  async getItemByQuery(query){
    let items;
    try{
      items = await Item.find({
        $or: [
          { name: { $regex: query, $options: 'i' } }, // Case-insensitive match for name
          { description: { $regex: query, $options: 'i' } } // Case-insensitive match for description
        ]
      });
      return items;
    } catch (err) {
      console.error('Error finding items', err)
      throw err
    }
  }
}

module.exports = new ItemRepository();