import { FC, ReactNode, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { AuthApi } from "@/api/cloudApi"
import { clearRequestPendingPool } from "@/api/helpers/axiosPendingPool"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { getLocalStorage } from "@/utils/storage"

interface CheckIsLoginWrapperProps {
  children: ReactNode
}

export const CheckIsLogin: FC<CheckIsLoginWrapperProps> = (props) => {
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
    if (currentUserId === "" || currentUserId == undefined) {
      AuthApi.request<CurrentUser>(
        {
          url: "/users",
          method: "GET",
        },
        (response) => {
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
