import jwt from 'jsonwebtoken'

const createToken = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '30d'
    })
    console.log("Token in function ", token)
    res.cookie("PMS", token, {
        httpOnly: true,
        secure: true,  // important for HTTPS
        sameSite: "None",  // required if frontend and backend are on different domains
        maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return token
}

export default createToken