const jwt = require('jsonwebtoken');

function auth(req, res, next) {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send('Access denied. No token provided.');

  // Split the header value to get the actual token                                                    //index : 0     index  : 1
  const token = authHeader.split(' ')[1];     //Bearer jfhifjfohfdujkjfkirfji+f/rkpr=                  //[bearer,      'jfhifjfohfdujkjfkirfji+f/rkpr=']
  if (!token) return res.status(401).send('Access denied. No valid token provided.');

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'fatma');
    // Add the decoded payload to the request object for future use
    req.user = decoded;
    // Call the next middleware function
    next();
  } catch (ex) {
    // If the token is invalid, return an error response
    res.status(400).send('Invalid token.');
  }
}

module.exports = auth;