export interface RegisterFields {
  username: string
  email: string
  verify: string
  password: string
  isSubscribe: boolean
}

export interface RegisterResult {
  userId: string
  userName: string
  email: string
  createdAt: string
}
