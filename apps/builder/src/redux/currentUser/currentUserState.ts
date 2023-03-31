export interface CurrentUser {
  userId: string
  nickname: string
  language: string
  email: string
  avatar?: string
  isTutorialViewed?: boolean
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
  userID: string
  isTutorialViewed: boolean
}

export const CurrentUserInitialState: CurrentUser = {
  userId: "",
  nickname: "",
  language: "",
  email: "",
}
