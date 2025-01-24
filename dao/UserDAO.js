let USER_COUNT = 0

module.exports = {

    findUserByLoginAndPassword : (email , password) => {
       
    },

    async listUsers(){
        return await User.find();
    }, 
    
    async loginUser(email){
        return await User.findOne({ email }).exec();
    }

}
