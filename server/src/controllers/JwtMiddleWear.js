import jwt from "jsonwebtoken"

const jwtMiddleware=(req,res,next)=>{
const authToken = req.headers["authorization"]
}