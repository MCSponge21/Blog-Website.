const jwt = require("jsonwebtoken");

//Protected routes have this middleware
function verifyToken(req, res, next){
    //Verfies the token in the auth header received from the client request
    const bearerHeader = req.headers['authorization'];
    const token = bearerHeader && bearerHeader.split(' ')[1];
    if(token == null) return res.send("Yeah nice try");

    jwt.verify(token, 'secret key', (err, data) => {
        if(err) return res.sendStatus(403);
        req.user = data;
        next();
    })
    
}

module.exports = {
    verifyToken
}