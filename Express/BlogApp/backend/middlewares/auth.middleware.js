export const authentication = (req, res, next) => {
  console.log(req.cookies);
  console.log();
  if (req.cookies.token) next();
  else {
    return res.status(401).json({
      success: false,
      message: "User not logged in",
    });
  }
};
