module.exports = (err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || "Server not working. Try again.",
    error: err,
  });
};
