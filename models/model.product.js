const mongoose = require('mongoose');
module.exports = mongoose.model('Product', 
    { 
        "name": { "type": "String", "required": true},
        "description": {"type": "String", "required": true},
        "creation_date": {"type": "Date"},
        "update_date": {"type": "Date"},
        "price": {"type": "Number", "required": true}
});