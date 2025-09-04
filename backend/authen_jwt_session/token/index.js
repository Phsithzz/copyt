import express from "express"
import jwt from "jsonwebtoken"
const app = express()
const port = 3000



app.get('/token/:key', (req, res) => {
    const authHeader = req.headers['authorization']
    console.log(`Authorization Header==>${authHeader}`)
    try {
        const secreatkey=req.params.key
        const token = authHeader.split(' ')[1];
        const user = jwt.verify(token,secreatkey)
        console.log(user)
        return res.status(200).json(user)
    }
    catch (err) {
        console.log('error', err.message)
        return res.status(403).json({ message: err.message})
    }
})

app.listen(port, () => {
    console.log(`Server is Running [Token] on port ${port}`)
})