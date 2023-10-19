import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { currentUserActions, getCurrentUser } from "@illa-public/user-data"
import { FC, useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { useMessage } from "@illa-design/react"
import { updateUserAvatar, uploadUserAvatar } from "@/api/auth"
import { TeamProvider } from "@/page/setting/context"
import { AccountSettingFields } from "@/page/setting/interface"
import { fetchUpdateNickName } from "@/services/user"
import MobileAccountSetting from "./mobile"
import PCAccountSetting from "./pc"

export const PersonalSetting: FC = () => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const userInfo = useSelector(getCurrentUser)
  const [accountLoading, setAccountLoading] = useState(false)

  const message = useMessage()
  const accountFormProps = useForm<AccountSettingFields>({
    mode: "onSubmit",
    criteriaMode: "firstError",
  })

  useEffect(() => {
    if (userInfo) {
      accountFormProps.reset({
        nickname: userInfo?.nickname,
      })
    }
    // todo: @echoxyc
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo?.nickname])

  const onAccountSubmit: SubmitHandler<AccountSettingFields> = async (data) => {
    try {
      setAccountLoading(true)
      await fetchUpdateNickName(data.nickname)
      message.success({
        content: t("team_setting.message.save_suc"),
      })
      window.location.reload()
    } catch (e) {
    } finally {
      setAccountLoading(false)
    }
  }

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
    <TeamProvider accountFormProps={accountFormProps}>
      <LayoutAutoChange
        desktopPage={
          <PCAccountSetting
            loading={accountLoading}
            onSubmit={onAccountSubmit}
            handleUpdateAvatar={handleUpdateAvatar}
          />
        }
        mobilePage={
          <MobileAccountSetting
            loading={accountLoading}
            onSubmit={onAccountSubmit}
            handleUpdateAvatar={handleUpdateAvatar}
          />
        }
      />
    </TeamProvider>
  )
}

PersonalSetting.displayName = "PersonalSetting"

export default PersonalSetting
