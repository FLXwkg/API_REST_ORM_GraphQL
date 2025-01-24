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

    async loginUser(email, password, hashPassword){

        // Fetch user by email
        const user = await UserDAO.loginUser(email);

        if (!user) {
            return null; // User not found
        }

        // If the flag for hashing is true, hash the password and compare
        if (hashPassword) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                return null; // Password mismatch
            }
        } else {
            // Compare passwords directly (no hashing)
            if (password !== user.password) {
                return null; // Password mismatch
            }
        }

        return user;
    
    }

}
