import jwt from "jsonwebtoken"

const theuser={
    id:"001",
    name:"roterit",
    role:"admin"
}
const secreatkey="thailandgogo"

const token = jwt.sign(theuser,secreatkey,{expiresIn:'1h'})
console.log(token)
