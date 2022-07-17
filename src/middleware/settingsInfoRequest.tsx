import { FC, Fragment, useEffect } from "react"
import { useDispatch } from "react-redux"
import { getLocalStorage } from "@/utils/storage"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"

const SettingsInfoRequest: FC = (props) => {
  const dispatch = useDispatch()

  // user info
  useEffect(() => {
    const token = getLocalStorage("token")
    if (token === "" || token === undefined || token === null) {
      return
    }
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
      },
      (response) => {},
    )
  }, [])
  return <Fragment>{props.children}</Fragment>
}

export default SettingsInfoRequest
