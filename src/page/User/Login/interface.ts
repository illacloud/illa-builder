import { Location } from "history"

export interface LoginFields {
  email: string
  password: string
}

export interface LoginResult {
  userId: string
  username: string
  email: string
  createdAt: string
  language: string
}

export interface LocationState {
  from?: Location
}
