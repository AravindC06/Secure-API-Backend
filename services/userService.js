const User = require("../models/User");

const userService = {
  getUserById: async (id) => {
    return await User.findById(id);
  },

  updateUser: async (id, userData) => {
    return await User.findByIdAndUpdate(id, userData, { new: true });
  },

  deleteUser: async (id) => {
    return await User.findByIdAndDelete(id);
  },
};

module.exports = userService;
