import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Message } from "@illa-design/message"
import { Api } from "@/api/base"
import { SettingCommonForm } from "../Components/SettingCommonForm"

export const SettingPassword: FC = () => {
  const { t } = useTranslation()

  const [currentPasswordValue, setCurrentPasswordValue] = useState<string>("")
  const [newPasswordValue, setNewPasswordValue] = useState<string>("")
  const [confirmPasswordValue, setConfirmPasswordValue] = useState<string>("")

  const [showCurrentPasswordError, setShowCurrentPasswordError] =
    useState<boolean>(false)
  const [showNewPasswordError, setShowNewPasswordError] =
    useState<boolean>(false)
  const [showConfirmPasswordError, setShowConfirmPasswordError] =
    useState<boolean>(false)

  const [currentPasswordErrorMsg, setCurrentPasswordErrorMsg] =
    useState<string>("")
  const [newPasswordErrorMsg, setNewPasswordErrorMsg] = useState<string>("")
  const [confirmPasswordErrorMsg, setConfirmPasswordErrorMsg] =
    useState<string>("")

  const [buttonDisabled, setButtonDisabled] = useState<boolean>(true)

  const paramData = [
    {
      title: t("setting.password.current_password"),
      content: [
        {
          type: "input",
          value: currentPasswordValue,
          onChange: (value: string) => {
            if (!value || !confirmPasswordValue || !newPasswordValue) {
              setButtonDisabled(true)
            } else {
              setButtonDisabled(false)
            }
            setCurrentPasswordValue(value)
          },
          showError: showCurrentPasswordError,
          errorMsg: currentPasswordErrorMsg,
        },
      ],
    },
    {
      title: t("setting.password.new_password"),
      content: [
        {
          type: "input",
          value: newPasswordValue,
          onChange: (value: string) => {
            if (!value || !confirmPasswordValue || !currentPasswordValue) {
              setButtonDisabled(true)
            } else {
              setButtonDisabled(false)
            }
            setNewPasswordValue(value)
          },
          showError: showNewPasswordError,
          errorMsg: newPasswordErrorMsg,
        },
      ],
    },
    {
      title: t("setting.password.confirm_password"),
      content: [
        {
          type: "input",
          value: confirmPasswordValue,
          onChange: (value: string) => {
            if (!value || !newPasswordValue || !currentPasswordValue) {
              setButtonDisabled(true)
            } else {
              setButtonDisabled(false)
            }
            setConfirmPasswordValue(value)
          },
          showError: showConfirmPasswordError,
          errorMsg: confirmPasswordErrorMsg,
        },
      ],
    },
    {
      content: [
        {
          type: "button",
          value: t("setting.password.submit_button"),
          disabled: buttonDisabled,
        },
      ],
    },
  ]

  const beforeFormat = () => {
    if (!currentPasswordValue) {
      setShowCurrentPasswordError(true)
      setCurrentPasswordErrorMsg(t("setting.password.empty_password"))
      return false
    }
    if (!newPasswordValue) {
      setShowNewPasswordError(true)
      setNewPasswordErrorMsg(t("setting.password.empty_password"))
      return false
    }
    if (!confirmPasswordValue) {
      setShowConfirmPasswordError(true)
      setConfirmPasswordErrorMsg(t("setting.password.empty_password"))
      return false
    }
    if (newPasswordValue.length < 3 || newPasswordValue.length > 15) {
      setShowNewPasswordError(true)
      setNewPasswordErrorMsg(t("setting.password.error_format_password"))
      return false
    }
    if (newPasswordValue !== confirmPasswordValue) {
      setShowConfirmPasswordError(true)
      setConfirmPasswordErrorMsg(t("setting.password.error_match_password"))
      return false
    }

    return true
  }

  const handleSubmit = () => {
    setShowCurrentPasswordError(false)
    setShowNewPasswordError(false)
    setShowConfirmPasswordError(false)

    if (!beforeFormat()) {
      return
    }

    Api.request(
      {
        url: "/users/password",
        method: "PATCH",
        data: {
          currentPassword: currentPasswordValue,
          newPassword: newPasswordValue,
        },
      },
      (response) => {
        Message.success("success!")
      },
      (failure) => {},
      (crash) => {
        Message.error(t("network_error"))
      },
    )
  }

  return <SettingCommonForm paramData={paramData} onSubmit={handleSubmit} />
}

SettingPassword.displayName = "SettingPassword"
