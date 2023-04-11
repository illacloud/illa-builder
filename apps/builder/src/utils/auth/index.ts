import { ILLABuilderStorage } from "@/utils/storage"

export const getAuthToken = () => {
  return ILLABuilderStorage.getLocalStorage("token") as string
}

export const removeAuthToken = () => {
  return ILLABuilderStorage.removeLocalStorage("token")
}
