const mongoose = require('mongoose');

const TypeSchema = new mongoose.Schema({
    title: {
      type: String,
      required:[true,"title is required"]
    }
  }, {timestamps: true});

  module.exports.TypeSchema=TypeSchema;
  module.exports.Type = mongoose.model("Type", TypeSchema);
