const asyncHandler = require('express-async-handler');
const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');

const SignUpUser = asyncHandler(async (req, res) => {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400).send("Please enter all fields");
    } else {
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            res.status(400).send("User already exist");
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const newUser = await User.create({
                    name: name,
                    email: email,
                    password: hashedPassword,
                });

                if (newUser) {
                    res.status(200).json({
                        _id: newUser._id,
                        name: newUser.name,
                        email: newUser.email,
                    });
                } else {
                    res.status(400).send("Failed to create user");
                }
            } catch (error) {
                throw new Error(error.message);
            }
        }
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const selectedUser = await User.findOne({ email });
    if (!selectedUser) {
        res.status(404).send("User Not Found");
    } else {
        try {
            const passwordMatched = await bcrypt.compare(password, selectedUser.password);
            if (!passwordMatched) {
                res.status(200).send("Your password is incorrect");
            } else {
                res.status(200).json({
                    _id: selectedUser._id,
                    name: selectedUser.name,
                    email: selectedUser.email,
                });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

});

module.exports = { SignUpUser, authUser };