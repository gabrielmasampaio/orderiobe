const itemService = require("../service/itemService")

const status = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_ERROR: 500,
}

const responseMessages = {
  NOT_FOUND: "Item not found",
  SAVED: "Item saved successfully",
  INTERNAL_ERROR: "Internal server error, contact administration",
  DELETED: "Item deleted successfully",
};

class ItemController {

  getItems = async (req, res) => {
    try {
      const { id, query } = req.query;


      if (id) {
        // If request has id in params, call get item by id
        const item = await itemService.getItemById(id)
        if (!item) {
          return res.status(status.NOT_FOUND).json({ message: responseMessages.NOT_FOUND});
        }
        return res.status(status.SUCCESS).json(item);
      } else if (query) {
        // If request has a string query, use search method
        const items = await itemService.findItems(query);
        return res.status(status.SUCCESS).json(items);
      } else {
        // If no id or query provided, get all items
        const items = await itemService.getAllItems();
        return res.status(status.CREATED).json(items);
      }
    } catch (err) {
      console.error('Error getting items:', err);
      return res.status(status.INTERNAL_ERROR).json({ message: responseMessages.INTERNAL_ERROR });
    }
  };

  postItem = async (req, res) => {
    try {
      const item = req.body;
      const savedItem = await itemService.saveItem(item);
      return res.status(status.SUCCESS).json(savedItem);
    } catch (error) {
      console.error('Error posting item: ', error);
      return res.status(status.INTERNAL_ERROR).json({ message: responseMessages.INTERNAL_ERROR });
    }
  };

  putItem = async (req, res) => {
    const item = req.body;
    try {
      const itemToChange = await itemService.getItemById(item._id)
      if (itemToChange) {
        const updatedItem = await itemService.saveItem(item)
        return res.status(status.SUCCESS).json(updatedItem);
      } else {
        return res.status(status.NOT_FOUND).json({message: responseMessages.NOT_FOUND})
      }
    } catch (error) {
      console.error('Error updating item: ', error);
      return res.status(status.INTERNAL_ERROR).json({message: responseMessages.INTERNAL_ERROR})
    }
  }

  deleteItem = async (req, res) => {
    try {
      const itemId = req.query.id;
      const item = await itemService.deleteItem(itemId);
      if(item) {
        return res.status(status.SUCCESS).json({ message: responseMessages.DELETED, item: item });
      } else {
        return res.status(status.NOT_FOUND).json({ message: responseMessages.NOT_FOUND});
      }
    } catch (error) {
      console.error('Error deleting item: ', error);
      return res.status(status.INTERNAL_ERROR).json({ message: responseMessages.INTERNAL_ERROR });
    }
  }

}

module.exports = new ItemController()