import { FC, useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, useMessage } from "@illa-design/react"
import { CloudApi } from "@/api/cloudApi"
import { updateUserAvatar, uploadUserAvatar } from "@/api/users"
import { AvatarUpload } from "@/illa-public-component/Cropper"
import { Avatar } from "@/page/App/components/Avatar"
import { LabelAndSetter } from "@/page/Setting/Components/LabelAndSetter"
import {
  avatarStyle,
  editLabelStyle,
  fullWidth,
  publicButtonWrapperStyle,
  settingAccountStyle,
} from "@/page/Setting/SettingAccount/style"
import { getCurrentUser } from "@/redux/currentUser/currentUserSelector"
import { currentUserActions } from "@/redux/currentUser/currentUserSlice"
import { UserInfoResponse } from "@/redux/currentUser/currentUserState"

export const SettingAccount: FC = () => {
  const { t } = useTranslation()
  const userInfo = useSelector(getCurrentUser)

  const dispatch = useDispatch()
  const [nickNameValue, setNickNameValue] = useState<string>(
    userInfo.nickname ?? "",
  )

  const message = useMessage()

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

  const handleUpdateAvatar = async (file: Blob) => {
    try {
      const icon = await uploadUserAvatar(file)
      await updateUserAvatar(icon)
      dispatch(currentUserActions.updateUserAvatarReducer(icon))
      message.success({
        content: t("profile.setting.message.save_suc"),
      })
      return true
    } catch (e) {
      console.error("handleUpdateAvatar error:", e)
      message.error({
        content: t("profile.setting.message.save_fail"),
      })
    }
    return false
  }

  return (
    <div css={settingAccountStyle}>
      <AvatarUpload onOk={handleUpdateAvatar}>
        <Avatar
          css={avatarStyle}
          userId={userInfo?.userId}
          nickname={userInfo?.nickname}
          avatar={userInfo?.avatar}
        />
        <span css={editLabelStyle}>Edit</span>
      </AvatarUpload>
      <div css={fullWidth}>
        <LabelAndSetter errorMessage="" label={t("setting.account.email")}>
          <Input
            value={userInfo?.email}
            disabled
            size="large"
            colorScheme="techPurple"
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
            colorScheme={errorMessage ? "red" : "techPurple"}
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
              CloudApi.request<UserInfoResponse>(
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
                      userId: response.data.id,
                    }),
                  )
                  message.success({
                    content: "success!",
                  })
                },
                (failure) => {
                  message.error({
                    content: t("setting.account.save_fail"),
                  })
                },
                (crash) => {
                  message.error({
                    content: t("network_error"),
                  })
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
      </div>
    </div>
  )
}

SettingAccount.displayName = "SettingAccount"
