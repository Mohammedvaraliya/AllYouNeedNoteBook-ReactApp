const jwt = require('jsonwebtoken');
const JWT_SECRET = 'VaraliyaIsCSEngeneEr'

const fetchuser = (req, res, next) => {
    // Get the user from jwt and add idd to req object
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please auhenticate using a valid token" })
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();

    } catch (error) {
        console.error(error.message)
        res.status(401).send({ error: "Please auhenticate using a valid token" });
    }


}

module.exports = fetchuser;