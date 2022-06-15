export interface LoginFields {
  email: string
  password: string
}

export interface LoginResult {
  userId: string
  userName: string
  email: string
  createdAt: string
}
