import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Message } from "@illa-design/message"
import { Api } from "@/api/base"
import { SettingCommonForm } from "../Components/SettingCommonForm"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { useSelector, useDispatch } from "react-redux"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"

export const SettingAccount: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const [usernameValue, setUsernameValue] = useState<string>("")
  const [showUserError, setShowUserError] = useState<boolean>(false)
  const [userErrorMsg, setUserErrorMsg] = useState<string>("")
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)
  const [buttonLoading, setButtonLoading] = useState<boolean>(false)

  const userInfo = useSelector(getCurrentUser)

  const paramData = [
    {
      title: t("setting.account.email"),
      subTitle: `(${t("setting.account.uneditable")})`,
      content: [
        {
          type: "input",
          value: userInfo?.email,
          disabled: true,
        },
      ],
    },
    {
      title: t("setting.account.username"),
      content: [
        {
          type: "input",
          value: usernameValue,
          onChange: (value: string) => {
            if (!value) {
              setButtonDisabled(true)
            } else {
              setButtonDisabled(false)
            }
            setUsernameValue(value)
          },
          showError: showUserError,
          errorMsg: userErrorMsg,
          onFocus: () => {
            setShowUserError(false)
          },
        },
      ],
    },
    {
      content: [
        {
          type: "button",
          value: t("setting.account.save"),
          disabled: buttonDisabled,
          loading: buttonLoading,
        },
      ],
    },
  ]

  const beforeFormat = () => {
    if (!usernameValue) {
      setUserErrorMsg(t("setting.account.empty_username"))
      return false
    }
    if (usernameValue.length < 3 || usernameValue.length > 15) {
      setUserErrorMsg(t("setting.account.error_username"))
      return false
    }
    return true
  }

  const handleSubmit = () => {
    if (!beforeFormat()) {
      setShowUserError(true)
      return
    }

    Api.request(
      {
        url: "/users/username",
        method: "PATCH",
        data: {
          username: usernameValue,
        },
      },
      (response) => {
        dispatch(currentUserActions.updateCurrentUserReducer(response.data))
        setUsernameValue("")
        Message.success("success!")
      },
      (failure) => {
        Message.error(t("setting.account.save_fail"))
      },
      (crash) => {
        Message.error(t("network_error"))
      },
      (loading) => {
        setButtonLoading(loading)
      },
    )
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingAccount.displayName = "SettingAccount"
