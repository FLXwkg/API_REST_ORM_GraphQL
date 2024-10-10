const mongoose = require('mongoose');
module.exports = mongoose.model('Product', 
    { 
        "_id": { "type": "ObjectId" },
        "name": { "type": "String"},
        "description": {"type": "String"},
        "creation_date": {"type": "Date"},
        "update_date": {"type": "Date"},
        "price": {"type": "Number"}
});