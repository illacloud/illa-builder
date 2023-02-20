export interface CurrentUser {
  userId: string
  nickname: string
  language: string
  email: string
}

export interface UserInfoResponse {
  id: string
  nickname: string
  language: string
  email: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  nickname: "",
  language: "",
  email: "",
}
