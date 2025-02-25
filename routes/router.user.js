const UserService = require("../services/UserService");
const express = require('express')
const router = express.Router()

/**
 * List users
 */
router.get('/', async (req, res) => {
    let users = await UserService.listUsers();
    
    res.json(users);
})

router.post('/:id', async (req, res) => {
    let id = req.params.id;
    let users = await UserService.createUser(id);
    res.json(users);
})

router.put('/:id', async (req, res) => {
    let id = req.params.id;
    let params = req.body
    let users = await UserService.updateUser(id, params);
    res.json(users);
})

router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    let users = await UserService.deleteUser(id);
    res.json(users);
})

module.exports = router