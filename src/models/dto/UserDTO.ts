export interface BaseUserDTO{
  id?: number
  firstName: string
  lastName: string
  email: string
  admin?: boolean
  //nameGit: string
}

export interface UserDTO extends BaseUserDTO{
  id:number
}

export interface CreateUserDTO extends BaseUserDTO{
  
  password: string
}

export type UpdateUserDTO = Partial<CreateUserDTO>

export interface LoginUserDTO extends UserDTO{
  password: string
}

export interface UserTokenPayload{
  sub: number
  email: string
  admin: boolean
  //nameGIT: String
  exp: number
  iat: number
}