const User = require("../models/userSchema");

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({
      error: "All users not found",
    });
  }
};

// Get single user
exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const singleUser = await User.findById(id);

    console.log(singleUser);
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(500).json({
      error: "User not found",
    });
  }
};

// Update product
exports.updateUser = async (req, res) => {
  try {
    const { fname, email, address, contact, occupation, gender, dateOfBirth } =
      req.body;

    const user = await User.findById(req.params.id);

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        fname: fname || user.fname,
        email: email || user.email,
        address: address || user.address,
        contact: contact || user.contact,
        occupation: occupation || user.occupation,
        gender: gender || user.gender,
        dateOfBirth: dateOfBirth || user.dateOfBirth,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "Error while updating profile" });
  }
};

// Delete product
exports.deleteUser = async (req, res) => {
  try {
    const deleteTheUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteTheUser);
  } catch (error) {
    res.status(500).json({ error: "Error while deleting user" });
  }
};
