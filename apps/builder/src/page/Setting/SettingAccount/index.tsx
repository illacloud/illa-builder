import { FC, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { publicButtonWrapperStyle } from "@/page/Setting/SettingAccount/style"
import { Button } from "@illa-design/button"
import { Api } from "@/api/base"
import { CurrentUser } from "@/redux/currentUser/currentUserState"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { Message } from "@illa-design/message"
import { LabelAndSetter } from "@/page/Setting/Components/LabelAndSetter"

export const SettingAccount: FC = () => {
  const { t } = useTranslation()
  const userInfo = useSelector(getCurrentUser)

  const dispatch = useDispatch()
  const [nickNameValue, setNickNameValue] = useState<string>(
    userInfo.nickname ?? "",
  )

  const [errorMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // TODO: @aruseito hack method,wait Router defender perfect
  useEffect(() => {
    setNickNameValue(userInfo.nickname ?? "")
  }, [userInfo])

  const checkUserNameValidate = useCallback(
    (nickName: string) => {
      if (!nickName) {
        setErrorMessage(t("setting.account.empty_username"))
        return
      }
      if (nickName.length < 3 || nickName.length > 20) {
        setErrorMessage(t("setting.account.error_username"))
        return
      }
      setErrorMessage("")
    },
    [t],
  )

  const handleChangeUserName = useCallback(
    (value: string) => {
      setNickNameValue(value)
      checkUserNameValidate(value)
    },
    [checkUserNameValidate],
  )
  return (
    <>
      <LabelAndSetter errorMessage="" label={t("setting.account.email")}>
        <Input
          value={userInfo?.email}
          disabled
          size="large"
          borderColor="techPurple"
          variant="fill"
        />
      </LabelAndSetter>

      <LabelAndSetter
        errorMessage={errorMessage}
        label={t("setting.account.username")}
      >
        <Input
          size="large"
          value={nickNameValue}
          onChange={handleChangeUserName}
          borderColor={errorMessage ? "red" : "techPurple"}
          variant="fill"
        />
      </LabelAndSetter>

      <div css={publicButtonWrapperStyle}>
        <Button
          size="large"
          fullWidth
          disabled={!!errorMessage}
          loading={isLoading}
          onClick={() => {
            if (!!errorMessage) {
              return
            }
            Api.request<CurrentUser>(
              {
                url: "/users/nickname",
                method: "PATCH",
                data: {
                  nickname: nickNameValue,
                },
              },
              (response) => {
                dispatch(
                  currentUserActions.updateCurrentUserReducer({
                    ...response.data,
                    nickname: response.data.nickname,
                  }),
                )
                Message.success("success!")
              },
              (failure) => {
                Message.error(t("setting.account.save_fail"))
              },
              (crash) => {
                Message.error(t("network_error"))
              },
              (loading) => {
                setIsLoading(loading)
              },
            )
          }}
          colorScheme="techPurple"
        >
          {t("setting.account.save")}
        </Button>
      </div>
    </>
  )
}

SettingAccount.displayName = "SettingAccount"
