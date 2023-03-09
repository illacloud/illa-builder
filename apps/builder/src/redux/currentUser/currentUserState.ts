export interface CurrentUser {
  userId: string
  nickname: string
  language: string
  email: string
  avatar?: string
}

export interface UserInfoResponse {
  id: string
  uid: string
  nickname: string
  email: string
  avatar?: string
  language: string
  createdAt: string
  updatedAt: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  nickname: "",
  language: "",
  email: "",
}
