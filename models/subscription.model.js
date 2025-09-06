import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
      index: true,
    },
    name: {
      type: String,
      required: [true, "Subscription name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    price: {
      type: Number,
      required: [true, "Subscription price is required"],
      min: [0, "Subscription price must be greater than 0"],
    },
    currency: {
      type: String,
      enum: ["USD", "EUR", "GBP", "HKD", "AUD", "CAD", "SGD"],
      default: "USD",
    },
    frequency: {
      type: String,
      enum: ["monthly", "yearly"],
    },
    category: {
      type: String,
      enum: ["streaming", "gaming", "software", "news", "music", "other"],
    },
    paymentMethod: {
      type: String,
      required: [true, "Payment method is required"],
      enum: [
        "credit card",
        "debit card",
        "paypal",
        "bank transfer",
        "alipay",
        "payme",
      ],
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "expired", "cancelled"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: [true, "Subscription start date is required"],
      validate: {
        validator: (value) => value <= new Date(),
        message: "Start date must be in the past",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (value) {
          return value <= this.startDate;
        },
        message: "Renewal date must be greater than start date",
      },
    },
  },
  { timestamps: true }
);

//Autocalculate the renewal date if missing
subscriptionSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewalPeriods = {
      monthly: 30,
      yearly: 365,
    };
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency]
    );
  }

  //Auto-update the status if the renewal date is passed.
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  next();
});

const Subscription = mongoose.model("Subscription", subscriptionSchema); //creating model
export default Subscription;
