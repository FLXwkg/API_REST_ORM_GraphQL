const UserDAO = require('../dao/UserDAO');

module.exports = {
    
    async listUsers(params){
        return await UserDAO.listUsers();
    },

    async createUser(params){
        return UserDAO.createUser(params);
    },

    async updateUser(id, params){
        return UserDAO.updateUser(id, params);
    },

    async deleteUser(params){
        return UserDAO.deleteUser(params);
    },

}
