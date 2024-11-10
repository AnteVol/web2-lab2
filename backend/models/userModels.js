//Ovdje se nalaze podaci sadržani u bazi:
const users = [
    { id: 1, username: 'admin', password: 'admin123', role: 'admin' },
    { id: 2, username: 'user', password: 'user123', role: 'user' }
];

const protectedData = [
    { id: 1, content: 'Only admin should access to this data 1', accessLevel: 'admin' },
    { id: 2, content: 'Only admin should access to this data 2', accessLevel: 'admin' },
    { id: 3, content: 'Everyone can access to this data 1', accessLevel: 'user' },
    { id: 4, content: 'Everyone can access to this data 2', accessLevel: 'user' },
    { id: 5, content: 'Everyone can access to this data 3', accessLevel: 'user' },
    { id: 6, content: 'Everyone can access to this data 4', accessLevel: 'user' }
];

module.exports = {
    users,
    protectedData
};