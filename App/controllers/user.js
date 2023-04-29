// How pages redirect/userInfo and setUserInfo state in App.js

const userModel = require("../models/user"); 

const newUser = async(req, res) => 
{
    try 
    {
        let { username, email, password } = req.body; 

        if (!username || !email || !password)
            return res.status (400).json ({ status: "ERROR", message: "Username, email and password are all required" }); 

        const existingEmail = await userModel.findOne ({ email })

        if (existingEmail)
            return res.status (400).json ({ status: "ERROR", message: "Email already in use" }); 

        const existingUsername = await userModel.findOne ({ username })

        if (existingUsername)
            return res.status (400).json ({ status: "ERROR", message: "Username already in use" }); 

        const newUser = await userModel.create({ username, email, password }); 

        req.session.userId = newUser._id;

        res.status(200).json({ 
            status: "SUCCESS", 
            message: "New user created successfully", 
            user: 
            {
                ...newUser._doc, 
                password: undefined 
            }
        }); 
    }
    catch (error)
    {
        console.error (error); 
        res.status (500).json ({ status: "ERROR", message: "Server error" }); 
    }
}

const login = async (req, res) => 
{
    try
    {
        const { username, password } = req.body; 

        if (!username || !password)
            return res.status (400).json ({ status: "ERROR", message: "Username and password are required" })

        const user = await userModel.findOne({ username }); 

        if (!user || user.password !== password)
            return res.status(404).json({ status: "ERROR", message: "Username or password incorrect" }); 

        req.session.userId = user._id;

        res.status(200).json({ 
            status: "SUCCESS", 
            message: "Logged in successfully", 
            user: 
            {
                ...user._doc, 
                password: undefined 
            }
        });
    }
    catch (error)
    {
        console.error (error); 
        res.status (500).json ({ status: "ERROR", message: "Server error" }); 
    }
}

const getUser = async(req, res) => 
{
    try
    {
        const { userId } = req.session; // get user id from session

        if (!userId)
            return res.status(403).json({ status: "ERROR", message: "User not logged in" }); 

        const user = await userModel.findById(userId); 
        
        if (!user)
            return res.status(404).json({ status:"ERROR", message: "Couldn't find user " + userId}); 
        
        res.status(200).json({ 
            status: "SUCCESS", 
            message: "Found user " + userId, 
            user: 
            {
                ...user._doc, 
                password: undefined 
            }
        }); 
    }
    catch (error)
    {
        console.error (error); 
        res.status (500).json ({ status: "ERROR", message: "Server error" }); 
    }
}

const logout = async(req, res) => 
{
    try
    {
        req.session.destroy(); 
        res.status(200).json({ status: "SUCCESS", message: "Logged out successfully" }); 
    }
    catch (error)
    {
        console.error (error); 
        res.status (500).json ({ status: "ERROR", message: "Server error" }); 
    }
}

module.exports = { getUser, newUser, login, logout }; 