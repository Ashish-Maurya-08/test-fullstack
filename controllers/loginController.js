const login = require('../models/login');

exports.login = async (req, res) => {
    console.log(req.body);
    
    const { username, password } = req.body;
    const user = await login.findOne({ f_userName: username, f_Pwd: password });
    if (user) {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }
} 

exports.register = async (req, res) => {
    const { username, password } = req.body;
    const user = await login.findOne({ f_userName: username });
    if (user) {
        res.status(409).json({ message: 'Username already exists' });
    } else {
        const newUser = new login({
            f_userName: username,
            f_Pwd: password
        });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    }
}

exports.checkEmpty = async (req, res) => {
    const users = await login.find();
    console.log(users.length);
    
    if (users.length === 0) {
        res.status(404).json({ message: 'No users found' });
    }
    else {
        res.status(200).json({ message: 'Users found' });
    }
}
