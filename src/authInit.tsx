import { ReactNode, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { getLocalStorage } from "@/utils/storage"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"

const AuthInit = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const token = getLocalStorage("token")
  const currentUserId = useSelector(getCurrentUser)?.userId

  const isLoginPage = location.pathname === "/user/login"

  useEffect(() => {
    if (!token) {
      navigate(`/user/login`)
      return
    }
    if (!currentUserId) {
      Api.request<CurrentUser>(
        {
          url: "/users",
          method: "GET",
        },
        (response) => {
          dispatch(
            currentUserActions.updateCurrentUserReducer({
              ...response.data,
              username: response.data.nickname,
            }),
          )
        },
      )
    }
  }, [])
  return isLoginPage ? (
    children
  ) : (
    <>{currentUserId && currentUserId > 0 && children}</>
  )
}

export default AuthInit
