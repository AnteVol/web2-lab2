const { users } = require('../models/userModels');

const login = (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
   
    if (user) {
        req.session.user = user;
        res.json({ success: true, user });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
};

const logout = (req, res) => {
    req.session.destroy();
    res.json({ success: true });
};

module.exports = {
    login,
    logout
};
