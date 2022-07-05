export interface RegisterFields {
  username: string
  email: string
  verificationCode: string
  password: string
  isSubscribed: boolean
}

export interface RegisterResult {
  userId: string
  username: string
  email: string
  createdAt: string
}
