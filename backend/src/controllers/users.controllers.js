const userCtrl = {};
const User = require('../models/User');

userCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

userCtrl.createUser = async (req, res) => {
    const {userName} = req.body;
    const newUser = new User({userName:userName});
    await newUser.save();
    res.json({message: 'POST users created'});
}

userCtrl.deleteUser = async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json('User deleted');
}

module.exports = userCtrl;