import axiosClient from "../api/axiosClient";

export const loginUserService = async (request: any) => {
    const url = "/auth/login"
    return await axiosClient.post(url, request.payload)
    
}

export const registerUserService = async (request: any) => {
  const url = "/auth/register"
  return await axiosClient.post(url, request.payload)
}

export const verifyEmailService = async (code:string | null) => {
  const url = '/auth/verify'
  return await axiosClient.get(url, {params: {code:code}})
}

export const sendResetPasswordToken = async(request: any) => {
  console.log(request)
  const url = '/auth/forgot-password'
  return await axiosClient.post(url, request)
}

export const resetPasswordService = async (request: any, token: string | null) => {
  console.log(request)
  console.log(token)
  const url = "/auth/reset-password"
  return await axiosClient.post(url, request, {params: {token}})
}
