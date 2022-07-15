import { ReactNode, useEffect, useState } from "react"
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

  const [showNextPage, setShowNextPage] = useState<boolean>(!!currentUserId && currentUserId > 0)

  useEffect(() => {
    if (!token) {
      navigate(`/user/login`)
      setShowNextPage(true)
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
              nickname: response.data.nickname,
            }),
          )
          setShowNextPage(true)
        },
      )
    }
  }, [])
  return (
    <>
      {showNextPage ? children : null}
    </>
  )
}

export default AuthInit
