import jwt from 'jsonwebtoken';

const generateJwtToken = async (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: '15d'
    });

    res.cookie("jwt", token, {
        maxAge: 15 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'none' 
    });

    return token;
}

export default generateJwtToken;
