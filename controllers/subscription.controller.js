import Subscription from "../models/subscription.model.js";

const createSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.create({
      ...req.body,
      user: req.user._id,
    });
    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

const getUserSubscription = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("Unauthorized access to subscriptions");
      error.status = 401;
      throw error;
    }

    const subscription = await Subscription.find({ user: req.params.id });
    res.status(200).json({
      success: true,
      data: subscription,
    });
  } catch (error) {
    next(error);
  }
};

export { createSubscription, getUserSubscription };
