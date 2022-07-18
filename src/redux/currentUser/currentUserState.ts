export interface CurrentUser {
  userId: number
  nickname: string
  userAvatar: string
  language: string
  email: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: 0,
  nickname: "",
  userAvatar: "",
  language: "",
  email: "",
}
