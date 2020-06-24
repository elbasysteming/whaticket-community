const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	let decodedToken;
	try {
		const [, token] = req.get("Authorization").split(" ");
		decodedToken = jwt.verify(token, "mysecret");
		req.userId = decodedToken.userId;
	} catch (err) {
		err.statusCode = 401;
		err.message = "invalidToken";
		next(err);
	}

	if (!decodedToken) {
		const error = new Error("Falha na autenticação");
		error.statusCode = 401;
		next(error);
	}

	next();
};