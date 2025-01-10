const mongoose = require('mongoose');
module.exports = mongoose.model('Rating', 
    { 
        "rate": { "type": "Number", "min": 0, "max": 5, "required": true},
        "comment": {"type": "String", "required": true},
        "product" : {"type": "ObjectID", "required": true},
        "date": {"type": "Date"}
});