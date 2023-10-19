import { ERROR_FLAG, isILLAAPiError } from "@illa-public/illa-net"
import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import {
  ResetPwdErrorMsg,
  ResetPwdFields,
} from "@illa-public/sso-module/ResetPasswordPage/interface"
import { currentUserActions, getCurrentUser } from "@illa-public/user-data"
import { FC, useState } from "react"
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { fetchSendVerificationCodeToEmail } from "@/api/auth"
import { TeamProvider } from "@/page/setting/context"
import { PasswordSettingFields } from "@/page/setting/interface"
import { fetchUpdatePasswordFromForgot } from "@/services/auth"
import { fetchUpdateUserPassword } from "@/services/user"
import { ILLACloudStorage } from "@/utils/storage"
import { MobilePasswordSettingContent } from "./mobile"
import { PasswordSettingContent } from "./pc"

const PasswordSettingPage: FC = () => {
  const { t } = useTranslation()
  const userInfo = useSelector(getCurrentUser)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [showCountDown, setShowCountDown] = useState(false)

  const [errorMsg, setErrorMsg] = useState<ResetPwdErrorMsg>({
    email: "",
    verificationCode: "",
  })
  const message = useMessage()
  const dispatch = useDispatch()

  const passwordFormProps = useForm<PasswordSettingFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })
  const setPasswordFormProps = useForm<ResetPwdFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
    defaultValues: {
      email: userInfo?.email,
    },
  })

  const onPasswordFormSubmit: SubmitHandler<PasswordSettingFields> = async (
    data,
  ) => {
    try {
      setPasswordLoading(true)
      await fetchUpdateUserPassword(data)
      message.success({
        content: t("team_setting.message.save_suc"),
      })
      passwordFormProps.reset()
    } catch (e) {
      if (isILLAAPiError(e)) {
      }
    } finally {
      setPasswordLoading(false)
    }
  }

  const onSubmit: SubmitHandler<ResetPwdFields> = async (data) => {
    const verificationToken = ILLACloudStorage.getSessionStorage(
      "verificationToken",
    ) as string
    try {
      await fetchUpdatePasswordFromForgot({
        verificationToken,
        ...data,
        email: userInfo?.email,
      })
      dispatch(
        currentUserActions.updateUserInfoReducer({
          isPasswordSet: true,
        }),
      )
      message.success({
        content: t("profile.setting.message.save_suc"),
      })
    } catch (e) {
      if (isILLAAPiError(e)) {
        switch (e?.data?.errorFlag) {
          case ERROR_FLAG.ERROR_FLAG_VALIDATE_VERIFICATION_CODE_FAILED:
            message.error({
              content: t(
                "page.user.sign_up.error_message.verification_code.invalid",
              ),
            })
            break
          default:
            message.error({
              content: t("profile.setting.message.save_fail"),
            })
            break
        }
        switch (e.data.errorMessage) {
          case "invalid verification code":
            setErrorMsg({
              ...errorMsg,
              verificationCode: t(
                "page.user.forgot_password.error_message.verification_code.invalid",
              ),
            })
            break
          default:
        }
      }
    }
  }

  const handleSendEmail = async (email: string) => {
    try {
      await fetchSendVerificationCodeToEmail(email, "forgetpwd")
    } catch (e) {}
  }

  return (
    <TeamProvider passwordFormProps={passwordFormProps}>
      <FormProvider {...setPasswordFormProps}>
        <LayoutAutoChange
          desktopPage={
            <PasswordSettingContent
              onPasswordFormSubmit={onPasswordFormSubmit}
              onResetPasswordSubmit={onSubmit}
              passwordLoading={passwordLoading}
              errorMsg={errorMsg}
              sendEmail={handleSendEmail}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          }
          mobilePage={
            <MobilePasswordSettingContent
              onPasswordFormSubmit={onPasswordFormSubmit}
              onResetPasswordSubmit={onSubmit}
              passwordLoading={passwordLoading}
              errorMsg={errorMsg}
              sendEmail={handleSendEmail}
              showCountDown={showCountDown}
              onCountDownChange={setShowCountDown}
            />
          }
        />
      </FormProvider>
    </TeamProvider>
  )
}

export default PasswordSettingPage
