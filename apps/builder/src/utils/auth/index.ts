import { getLocalStorage, removeLocalStorage } from "@/utils/storage"

export const getAuthToken = () => {
  return getLocalStorage("token")
}

export const removeAuthToken = () => {
  return removeLocalStorage("token")
}
