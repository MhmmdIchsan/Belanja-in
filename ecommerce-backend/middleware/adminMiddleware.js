const adminMiddleware = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      return res.status(403).json({ message: "Hanya admin yang dapat mengakses ini." });
    }
  };
  
  module.exports = adminMiddleware;
  