const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const companySchema = new Schema({
  userName: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },

  password: {
    type: String,
    trim: true,
    required: true,
  },

  employees: [
    {
      type: Schema.Types.ObjectId,
      ref: "Employee",
    },
  ],

  type: {
    type: String,
    default: "company",
  },
});

module.exports = mongoose.model("Company", companySchema);
