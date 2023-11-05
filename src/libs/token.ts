import { get } from "http";
import { getEnvVariable } from "./helpers";
import {SignJWT, jwtVerify} from "jose"

export const signJWT = async (
  payload: { sub: string, rol: string },
  options: { exp: string }
) => {
  try {
    const secret = new TextEncoder().encode(getEnvVariable("JWT_SECRET_KEY"));
    const alg = "HS256";

    const token = new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(options.exp)
      .setIssuedAt()
      .sign(secret);

    return token;
  } catch (error) {
    throw error;
  }
};


export const verifyJWT =async <T>(token:string):Promise<T> => {
  try{
    return (
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.JWT_SECRET_KEY)
      )
    ).payload as T
  }catch(error){
    console.log(error)
    throw new Error("Your token has expired")
  }
}

