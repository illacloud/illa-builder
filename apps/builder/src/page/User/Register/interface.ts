export interface RegisterFields {
  nickname: string
  email: string
  verificationCode: string
  password: string
  isSubscribed: boolean
}

export interface RegisterResult {
  id: string
  nickname: string
  email: string
  language: string
}
