var mongoose = require("mongoose");

var policySchema = new mongoose.Schema({
  agent: {
    type: String,
  },
  userType: {
    type: String,
  },
  policy_mode: {
    type: Number,
  },
  producer: {
    type: String,
  },
  policy_number: {
    type: String,
  },
  premium_amount: {
    type: Number,
  },
  policy_type: {
    type: String,
  },
  company_name: {
    type: String,
  },
  policy_start_date: {
    type: String,
  },
  policy_end_date: {
    type: String,
  },
  category_name: {
    type: String,
  },
  csr: {
    type: String,
  },
  account_name: {
    type: String,
  },
  email: {
    type: String,
  },
  
});

module.exports = mongoose.model("Policy_records", policySchema);
