// C'est pas beau les mots de passe en clair dans une BDD !!!
const {MongoClient} = require('mongodb');

const client = new MongoClient("mongodb://127.0.0.1:27017/mds_tp_training_api");

const  users = [
    {
        "isActive": false,
        "first_name": "Geneva",
        "last_name": "Welch",
        "gender": "female",
        "role" : "ADMIN",
        "password": "Password574!@",
        "email": "genevawelch@rotodyne.com",
        "phone": "+1 (850) 407-3099",
        "address": "162 Rochester Avenue, Hebron, Wyoming, 857",
        "registered":new Date("2018-12-09T09:46:57 -01:00")
    },
    {
        "isActive": true,
        "first_name": "Ethel",
        "last_name": "Jarvis",
        "gender": "female",
        "role" : "ADMIN",
        "password": "Password7242!@",
        "email": "etheljarvis@rotodyne.com",
        "phone": "+1 (979) 527-2089",
        "address": "630 Dunne Court, Grandview, Oklahoma, 1282",
        "registered": new Date("2016-06-26T01:39:50 -02:00")
    },
    {
        "isActive": true,
        "first_name": "Dominguez",
        "last_name": "Ray",
        "gender": "male",
        "role" : "CUSTOMER",
        "password": "Password347!@",
        "email": "dominguezray@rotodyne.com",
        "phone": "+1 (859) 409-3003",
        "address": "304 Clove Road, Yettem, Hawaii, 350",
        "registered": new Date("2014-06-14T06:59:04 -02:00")
    },
    {
        "isActive": true,
        "first_name": "Stefanie",
        "last_name": "Melton",
        "gender": "female",
        "role" : "CUSTOMER",
        "password": "Password3494!@",
        "email": "stefaniemelton@rotodyne.com",
        "phone": "+1 (970) 432-2144",
        "address": "817 Strickland Avenue, Grill, New Jersey, 3093",
        "registered": new Date("2016-10-08T02:11:59 -02:00")
    },
    {
        "isActive": true,
        "first_name": "Dona",
        "last_name": "Head",
        "gender": "female",
        "role" : "CUSTOMER",
        "password": "Password4968!@",
        "email": "donahead@rotodyne.com",
        "phone": "+1 (881) 527-2233",
        "address": "912 Dennett Place, Katonah, Palau, 9522",
        "registered": new Date("2017-04-28T08:29:51 -02:00")
    }
]

const products = [
    {
        "name": "Rotator",
        "description": "Un super produit à la pointe de la technologie",
        "creation_date": new Date(),
        "update_date" : new Date(),
        "price": 67,
    },
    {
        "name": "Truelle",
        "description": "Un materiel robuste et de qualité",
        "creation_date": new Date(),
        "update_date" : new Date(),
        "price": 58
    },
    {
        "name": "Clef Sys.",
        "description": "Une finition d'exception",
        "creation_date": new Date(),
        "update_date" : new Date(),
        "price": 45
    }
]


client.connect().then(async (db)=> {
    console.log("Connected to db")
    await db.db('mds_tp_training_api').dropDatabase();
    await db.db('mds_tp_training_api').collection("users").insertMany(users);
    await db.db('mds_tp_training_api').collection("products").insertMany(products);
    await client.close()
})
   



