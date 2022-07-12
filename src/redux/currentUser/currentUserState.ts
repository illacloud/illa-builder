export interface CurrentUser {
  userId: string
  username: string
  userAvatar: string
  language: string
  email: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  username: "",
  userAvatar: "",
  language: "English",
  email: "",
}
