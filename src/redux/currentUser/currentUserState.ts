export interface CurrentUser {
  userId: string
  userName: string
  userAvatar: string
  language: string
  email: string
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  userName: "",
  userAvatar: "",
  language: "English",
  email: "",
}
