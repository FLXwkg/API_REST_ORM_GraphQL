let USER_COUNT = 0

module.exports = {

    findUserByLoginAndPassword : (email , password) => {
        return FAKE_DB.users.find((it) => it.email === email && it.password === password);
    }

}
