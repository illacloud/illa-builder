import { useEffect, FC, ReactNode } from "react"
import { getLocalStorage } from "@/utils/storage"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"

interface CheckIsLoginWrapperProps {
  children: ReactNode
}

export const CheckIsLogin: FC<CheckIsLoginWrapperProps> = props => {
  const { children } = props
  const navigate = useNavigate()
  const token = getLocalStorage("token")
  const currentUserId = useSelector(getCurrentUser).userId
  const dispatch = useDispatch()

  useEffect(() => {
    if (!token) {
      clearRequestPendingPool()
      navigate("/user/login", { state: { from: location } })
      return
    }
    if (currentUserId === 0 || currentUserId == undefined) {
      Api.request<CurrentUser>(
        {
          url: "/users",
          method: "GET",
        },
        response => {
          // TIPS: can check user role
          dispatch(
            currentUserActions.updateCurrentUserReducer({
              ...response.data,
              nickname: response.data.nickname,
            }),
          )
        },
        () => {},
        () => {
          clearRequestPendingPool()
          navigate("/user/login", { state: { from: location } })
        },
      )
    }
  }, [token, currentUserId, dispatch, navigate])

  return <>{children}</>
}
