const bcrypt = require("bcrypt");

const hashPassword = async (password, saltRounds) => {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.log(err);
    }
    return null;
}

const comparePasswords = async (password, hash) => {
    try {
        const matchFound = await bcrypt.compare(password, hash);
        return matchFound
    } catch (err) {
        console.log(err);
    }
    return false
};

module.exports = {
    hashPassword,
    comparePasswords
};
