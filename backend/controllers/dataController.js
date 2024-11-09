const { protectedData } = require('../models/userModels');

const getProtectedData = (req, res) => {
    const { accessControlEnabled } = req.query;
    const user = req.session.user;
    
    if (!user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }
    
    if (accessControlEnabled === 'true') {
        const accessibleData = protectedData.filter(
            item => item.accessLevel === user.role || item.accessLevel === 'user'
        );
        res.json({ data: accessibleData });
    } else {
        res.json({ data: protectedData });
    }
};

const handleComments = (req, res) => {
    const { content, xssProtection } = req.body;
   
    if (xssProtection) {
        const sanitizedContent = content
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#x27;');
        res.json({ content: sanitizedContent });
    } else {
        res.json({ content });
    }
};

module.exports = {
    getProtectedData,
    handleComments
};