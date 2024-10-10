const mongoose = require('mongoose');
module.exports = mongoose.model('User', 
    { 
        "_id": { "type": "ObjectId" },
        "isActive": { "type": "Boolean"},
        "first_name": {"type": "String"},
        "last_name": {"type": "String"},
        "gender": {"type": "String"},
        "role": {"type": "String"},
        "password": {"type": "String"},
        "email": {"type": "String"},
        "phone": {"type": "String"},
        "address": {"type": "String"},
        "registered": {"type": "Date"}
});