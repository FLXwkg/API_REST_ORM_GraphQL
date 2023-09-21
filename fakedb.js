// C'est pas beau les mots de passe en clair dans une BDD !!!
module.exports = {

    users : [
        {
            "_id": "6139fd21f234f74537bffddf",
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
            "_id": "6139fd21aa670f11d559a9cb",
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
            "_id": "6139fd21740267f066962bda",
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
            "_id": "6139fd21dbe06a491d498a94",
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
            "_id": "6139fd2172cdbbe410f2be0c",
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
    ],

    products : [
        {
            "_id": "613a10f0b7cf7e05dd7b9bac",
            "name": "Rotator",
            "description": "Un super produit à la pointe de la technologie",
            "creation_date": "Mon Oct 11 2016 01:36:29 GMT+0100 (heure normale d’Europe centrale)",
            "price": 67,
        },
        {
            "_id": "613a10f0f7c0797b9bfb3e72",
            "name": "Truelle",
            "description": "Un materiel robuste et de qualité",
            "creation_date": "Thu Apr 12 1984 19:56:56 GMT+0200 (heure d’été d’Europe centrale)",
            "price": 58
        },
        {
            "_id": "613a10f08b796bc2f7cadd70",
            "name": "Clef Sys.",
            "description": "Une finition d'exception",
            "creation_date": "Mon Sep 21 1998 06:14:51 GMT+0200 (heure d’été d’Europe centrale)",
            "price": 45
        }
    ],

    ratings : [
        {
            "product": "613a10f0b7cf7e05dd7b9bac",
            "rate" : 3,
            "comment" : "It is a good product ! I recommend it !"
        },
        {
            "product": "613a10f0b7cf7e05dd7b9bac",
            "rate" : 5,
            "comment" : "Amazing product"
        },
        {
            "product": "613a10f08b796bc2f7cadd70",
            "rate" : 4,
            "comment" : "I'm very satisfied by this product"
        },
    ]

}
