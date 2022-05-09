import { NextFunction, Request,Response } from "express";
import { verifyToken } from "../lib/jwt";

const MISSING_AUTH_MSG = 'Missing authorization header';

interface tokenValidatorOptions { //Para validar al admin
    adminOnly?: boolean;
}

export default function tokenValidator(options?: tokenValidatorOptions) {
  return function (req:Request,res:Response, next:NextFunction) {
    const authHeader = req.headers.authorization;
    if(!authHeader){
      res.status(401).json({message:MISSING_AUTH_MSG});
      return
    }
    
    const [bearer,token] = authHeader.split(' ');
    if(bearer !== 'Bearer'){
      res.status(401).json({message:MISSING_AUTH_MSG});
      return  
    }

    try{
      const tokenPayload = verifyToken(token)
      req.user = tokenPayload
    }catch{
      res.status(401).json({message:MISSING_AUTH_MSG});
      return
    }
    if (options?.adminOnly && !req.user.admin) {
      res.status(403).json({message:'You are not an admin'});
      return
    }

    return next()
  }

}