import { ReactNode, useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getLocalStorage } from "@/utils/storage"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"

const AuthInit = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState<boolean>(true)

  const token = getLocalStorage("token")
  const currentUserId = useSelector(getCurrentUser)?.userId

  useEffect(() => {
    if (!token) {
      window.open(`${location.protocol}//${location.host}/user/login`, "_blank")
      return
    }
    if (!currentUserId) {
      Api.request<CurrentUser>(
        {
          url: "/users",
          method: "GET",
        },
        (response) => {
          dispatch(currentUserActions.updateCurrentUserReducer(response.data))
        },
        () => {},
        () => {},
        (loading) => {
          setLoading(loading)
        },
      )
    } else {
      setLoading(false)
    }
  }, [])
  return <>{loading ? <div>This is loading</div> : children}</>
}

export default AuthInit
