module.exports = (req, res, next) => {
  // It will add a header to each response
  res.set({ 'Access-Control-Allow-Origin': '*' });
  next();
};
