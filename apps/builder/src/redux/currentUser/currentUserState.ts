export interface CurrentUser {
  userId: number
  nickname: string
  language: string
  email: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: 0,
  nickname: "",
  language: "",
  email: "",
}
