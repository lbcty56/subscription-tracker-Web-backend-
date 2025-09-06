import User from "../models/user.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    // Check if the authenticated user is trying to access their own profile
    // If not, throw an error
    // req.user is set by the authorize middleware
    const authenticatedUser = req.user._id;
    const requestedUser = req.params.id;
    if (authenticatedUser.toString() !== requestedUser.toString()) {
      const error = new Error("You are not authorized to view this user");
      error.statusCode = 403;
      throw error;
    }

    const user = await User.findById(requestedUser).select("-password");

    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
