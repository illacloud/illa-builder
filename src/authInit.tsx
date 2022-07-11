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
  const [loading, setLoading] = useState<boolean>(true)

  const token = getLocalStorage("token")
  const currentUserId = useSelector(getCurrentUser)?.userId

  useEffect(() => {
    if (!token) {
      navigate(`/user/login`)
      setLoading(false)
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
