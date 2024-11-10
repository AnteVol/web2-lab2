const { pool } = require('../db-utils/db-setup');

const getProtectedData = async (req, res) => {
    try {
        const { accessControlEnabled } = req.query;

        let query;
        let queryParams;
       
        if (accessControlEnabled === 'true') {
            query = `
                SELECT * FROM protected_data 
                WHERE access_level = 'user' 
                OR ($1 = 'admin' AND access_level = 'admin')
                ORDER BY id
            `;
            queryParams = [user.role];
        } else {
            query = 'SELECT * FROM protected_data ORDER BY id';
            queryParams = [];
        }

        const result = await pool.query(query, queryParams);
        res.json({ data: result.rows });

    } catch (error) {
        console.error('Error fetching protected data:', error);
        res.status(500).json({ 
            message: 'Error fetching protected data',
        });
    }
};

const handleXss = (req, res) => {
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
    handleXss
};