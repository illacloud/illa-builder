export interface CurrentUser {
  userId: string
  nickname: string
  language: string
  email: string
  avatar?: string
}

export interface UserInfoResponse {
  id: string
  nickname: string
  language: string
  email: string
  avatar?: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  nickname: "",
  language: "",
  email: "",
}
