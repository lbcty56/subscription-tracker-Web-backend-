import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // Deduct 5 tokens from the bucket

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({
          error: "Too many requests. Please try again later.",
        });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({
          error: "Access denied for bots.",
        });
      }
      return res.status(403).json({
        error: "Access denied.",
      });
    }

    next();
  } catch (error) {
    console.error("Arcjet middleware error:", error);
  }
};

export default arcjetMiddleware;
