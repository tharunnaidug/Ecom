import jwt from 'jsonwebtoken'

const verify = async (req, res, next) => {
    const key = process.env.JWT_SECRET_KEY;
    const token = req.cookies.jwt;
    if (!token) return res.status(401).json({ error: 'Access denied' });
    try {
        const decoded = jwt.verify(token, key);
        req.admin = decoded.admin;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
}
export default verify;