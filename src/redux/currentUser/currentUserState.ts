export interface CurrentUser {
  userId: number
  username: string
  userAvatar: string
  language: string
  email: string
  nickname?: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: 0,
  username: "",
  userAvatar: "",
  language: "English",
  email: "",
  nickname: "",
}
