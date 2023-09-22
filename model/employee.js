const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
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

  name: {
    type: String,
    trim: true,
    required: true,
  },

  idCompany: {
    type: Schema.Types.ObjectId,
    ref: "Company",
  },

  type: {
    type: String,
    default: "employee",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Employee", employeeSchema);
