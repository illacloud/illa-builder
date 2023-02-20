import { ChangeEvent, FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Password, useMessage } from "@illa-design/react"
import { CloudApi } from "@/api/cloudApi"
import { LabelAndSetter } from "@/page/Setting/Components/LabelAndSetter"
import { publicButtonWrapperStyle } from "@/page/Setting/SettingAccount/style"

const validatePasswordEmpty = (password: string) => {
  return !password
}

const validatePasswordLength = (password: string) => {
  return password.length < 6 || password.length > 20
}

const validateNewPassword = (password: string) => {
  return password.includes(" ")
}

const validateConfirmationAndNewEqual = (
  newPassword: string,
  confirmation: string,
) => {
  return newPassword !== confirmation
}

export const SettingPassword: FC = () => {
  const { t } = useTranslation()
  const [currentPassword, setCurrentPassword] = useState<string>("")
  const [currentPasswordErrorMessage, setCurrentPasswordErrorMessage] =
    useState<string>("")

  const message = useMessage()
  const [newPassword, setNewPassword] = useState<string>("")
  const [newPasswordErrorMessage, setNewPasswordErrorMessage] =
    useState<string>("")

  const [confirmPassword, setConfirmPassword] = useState<string>("")
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] =
    useState("")

  const [isLoading, setIsLoading] = useState(false)

  const isButtonDisabled = useMemo(() => {
    return (
      !currentPassword ||
      !newPassword ||
      !confirmPassword ||
      !!currentPasswordErrorMessage ||
      !!newPasswordErrorMessage ||
      !!confirmPasswordErrorMessage
    )
  }, [
    currentPassword,
    newPassword,
    confirmPassword,
    currentPasswordErrorMessage,
    newPasswordErrorMessage,
    confirmPasswordErrorMessage,
  ])

  const handleChangeNewPassword = useCallback(
    (value: string) => {
      setNewPassword(value)
      if (validatePasswordEmpty(value)) {
        setNewPasswordErrorMessage(t("setting.password.empty_password"))
        return
      }
      if (validatePasswordLength(value)) {
        setNewPasswordErrorMessage(t("setting.password.error_format_password"))
        return
      }

      if (validateNewPassword(value)) {
        setNewPasswordErrorMessage(
          t("setting.password.error_password_has_empty"),
        )
        return
      }

      setNewPasswordErrorMessage("")
    },
    [t],
  )

  const handleChangeConfirmPassword = useCallback(
    (value: string) => {
      setConfirmPassword(value)
      if (validatePasswordEmpty(value)) {
        setConfirmPasswordErrorMessage(t("setting.password.empty_password"))
        return
      }

      if (validatePasswordLength(value)) {
        setConfirmPasswordErrorMessage(
          t("setting.password.error_format_password"),
        )
        return
      }

      if (validateNewPassword(value)) {
        setConfirmPasswordErrorMessage(
          t("setting.password.error_password_has_empty"),
        )
        return
      }

      if (validateConfirmationAndNewEqual(newPassword, value)) {
        setConfirmPasswordErrorMessage(
          t("setting.password.error_match_password"),
        )
        return
      }

      setConfirmPasswordErrorMessage("")
    },
    [newPassword, t],
  )

  const handleChangeCurrentPassword = useCallback(
    (value: string) => {
      setCurrentPassword(value)
      if (validatePasswordEmpty(value)) {
        setCurrentPasswordErrorMessage(t("setting.password.empty_password"))
        return
      }
      setCurrentPasswordErrorMessage("")
    },
    [t],
  )

  const onClickSubmitButton = useCallback(() => {
    if (
      currentPassword === "" ||
      newPassword === "" ||
      confirmPassword === ""
    ) {
      return
    }
    CloudApi.request(
      {
        url: "/users/password",
        method: "PATCH",
        data: {
          currentPassword,
          newPassword,
        },
      },
      () => {
        setCurrentPassword("")
        setNewPassword("")
        setConfirmPassword("")
        message.success({
          content: t("edit_success"),
        })
      },
      (failure) => {
        //  TODO: need error code unique,to show error message
        const { data } = failure
        if (data?.errorCode === 400) {
          message.error({
            content: failure.data.errorMessage,
          })
        }
      },
      () => {
        message.error({
          content: t("network_error"),
        })
      },
      (loading) => {
        setIsLoading(loading)
      },
    )
  }, [currentPassword, newPassword, confirmPassword, message, t])

  return (
    <>
      <LabelAndSetter
        errorMessage={currentPasswordErrorMessage}
        label={t("setting.password.current_password")}
      >
        <Password
          size="large"
          value={currentPassword}
          onChange={(v) => {
            handleChangeCurrentPassword(v)
          }}
          colorScheme="techPurple"
          variant="fill"
        />
      </LabelAndSetter>

      <LabelAndSetter
        errorMessage={newPasswordErrorMessage}
        label={t("setting.password.new_password")}
      >
        <Password
          size="large"
          value={newPassword}
          onChange={handleChangeNewPassword}
          colorScheme="techPurple"
          variant="fill"
        />
      </LabelAndSetter>

      <LabelAndSetter
        errorMessage={confirmPasswordErrorMessage}
        label={t("setting.password.confirm_password")}
      >
        <Password
          size="large"
          value={confirmPassword}
          onChange={handleChangeConfirmPassword}
          colorScheme="techPurple"
          variant="fill"
        />
      </LabelAndSetter>

      <div css={publicButtonWrapperStyle}>
        <Button
          size="large"
          fullWidth
          disabled={isButtonDisabled}
          loading={isLoading}
          colorScheme="techPurple"
          onClick={onClickSubmitButton}
        >
          {t("setting.password.submit_button")}
        </Button>
      </div>
    </>
  )
}

SettingPassword.displayName = "SettingPassword"
