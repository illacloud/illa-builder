import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Message } from "@illa-design/message"
import { Api } from "@/api/base"
import { SettingCommonForm } from "../Components/SettingCommonForm"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { useSelector } from "react-redux"

export const SettingAccount: FC = () => {
  const { t } = useTranslation()

  const [usernameValue, setUsernameValue] = useState<string>("")
  const [showUserError, setShowUserError] = useState<boolean>(false)
  const [userErrorMsg, setUserErrorMsg] = useState<string>("")
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const userInfo = useSelector(getCurrentUser)

  const paramData = [
    {
      title: "Email",
      subTitle: "(uneditable)",
      content: [
        {
          type: "input",
          value: userInfo?.username,
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
        },
      ],
    },
    {
      content: [
        {
          type: "button",
          value: t("setting.account.save"),
          disabled: buttonDisabled,
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
    setShowUserError(false)
    if (!beforeFormat()) {
      setShowUserError(true)
      return
    }

    Api.request(
      {
        url: "/users/username",
        method: "PATCH",
        data: {
          userName: usernameValue,
        },
      },
      (response) => {
        Message.success("success!")
      },
      (failure) => {
        Message.error(t("setting.account.save_fail"))
      },
      (crash) => {
        Message.error(t("network_error"))
      },
    )
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingAccount.displayName = "SettingAccount"
