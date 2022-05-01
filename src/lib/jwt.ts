// npm i jsonwebtoken --> installar
// npm i --save-dev @types/jsonwebtoken --> installar
import jwt from 'jsonwebtoken';
import { UserDTO, UserTokenPayload } from '../models/dto/UserDTO';


const secret = process.env.JWT_SECRET as string; // para que no pquede en el repositorio

if(!secret){
  throw new Error('JWT_SECRET is not found in environment variables');
}

export function generateToken(user:UserDTO):string{
  return jwt.sign(
    {sub:user.id, email:user.email},
     secret,
     {expiresIn: '7d'}
    )
}

export function verifyToken(token:string):UserTokenPayload{
  const verified = jwt.verify(token, secret)
  return  verified as unknown as UserTokenPayload;

}

