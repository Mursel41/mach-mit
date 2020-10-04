module.exports = (req, res, next) => {
  // It will add a header to each response
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, X-Auth-Token',
    'Access-Control-Expose-Headers': 'X-Auth-Token',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  });
  next();
};
