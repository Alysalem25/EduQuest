// const authorize = (requiredPermission) => {
//   return (req, res, next) => {
//     // 1. Check if user exists (should be populated by authMiddleware)
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ error: "Unauthorized: No user found in request" });
//     }

//     next();
//   };
// };

// module.exports = authorize;


const authorize = (requiredRole) => {
  return (req, res, next) => {
    // 1. Must be authenticated first (authMiddleware must run before this)
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized: No user found in request" });
    }

    // 2. Check role if specified
    if (requiredRole && req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Forbidden: Admin access required" });
    }

    next();
  };
};

module.exports = authorize;