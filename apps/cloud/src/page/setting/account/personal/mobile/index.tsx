import { Avatar } from "@illa-public/avatar"
import { AvatarUpload } from "@illa-public/cropper"
import { getCurrentUser } from "@illa-public/user-data"
import { FC, useContext } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, CameraIcon, Input } from "@illa-design/react"
import { TeamContext } from "@/page/setting/context"
import { AccountSettingFields } from "@/page/setting/interface"
import SettingMobileLayout from "@/page/setting/layout/mobile"
import { AccountSettingMobileProps } from "./interface"
import {
  avatarContainerStyle,
  cameraIconContainerStyle,
  containerStyle,
  controllerContainerStyle,
  formContainerStyle,
  formLabelStyle,
  tipTextStyle,
} from "./style"
import { errorMsgStyle } from "./style"

const MobileAccountSetting: FC<AccountSettingMobileProps> = (props) => {
  const { t } = useTranslation()
  const { accountFormProps } = useContext(TeamContext)
  const { onSubmit, loading, handleUpdateAvatar } = props
  const {
    handleSubmit,
    control,
    formState,
    formState: { isDirty },
  } = accountFormProps as UseFormReturn<AccountSettingFields>
  const userInfo = useSelector(getCurrentUser)

  return (
    <SettingMobileLayout>
      <div css={containerStyle}>
        <div css={avatarContainerStyle}>
          <AvatarUpload isMobile onOk={handleUpdateAvatar}>
            <div css={cameraIconContainerStyle}>
              <CameraIcon />
            </div>
            <Avatar
              size={100}
              id={userInfo?.userID}
              name={userInfo?.nickname}
              avatarUrl={userInfo?.avatar}
            />
          </AvatarUpload>
        </div>
        <form onSubmit={handleSubmit?.(onSubmit)} css={formContainerStyle}>
          <section css={controllerContainerStyle}>
            <label css={formLabelStyle}>{t("profile.setting.username")}</label>
            <div>
              <Controller
                name="nickname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    size="large"
                    error={!!formState?.errors.nickname}
                    variant="fill"
                    placeholder={t("profile.setting.username")}
                    colorScheme="techPurple"
                  />
                )}
                rules={{
                  required: t("profile.setting.username_empty"),
                  maxLength: {
                    value: 15,
                    message: t("profile.setting.username_length"),
                  },
                  minLength: {
                    value: 3,
                    message: t("profile.setting.username_length"),
                  },
                }}
              />
              {formState?.errors.nickname && (
                <div css={errorMsgStyle}>
                  {formState?.errors.nickname?.message}
                </div>
              )}
            </div>
          </section>
          <section css={controllerContainerStyle}>
            <label css={formLabelStyle}>
              {t("profile.setting.email")}
              <span css={tipTextStyle}> {t("profile.setting.uneditable")}</span>
            </label>
            <div>
              <Input
                disabled
                size="large"
                variant="fill"
                value={userInfo.email}
                placeholder={t("profile.setting.new_password_placeholder")}
                colorScheme="techPurple"
              />
            </div>
          </section>
          <Button
            colorScheme="techPurple"
            size="large"
            loading={loading}
            disabled={!isDirty}
            fullWidth
          >
            {t("profile.setting.save")}
          </Button>
        </form>
      </div>
    </SettingMobileLayout>
  )
}

MobileAccountSetting.displayName = "AccountSettingMobile"

export default MobileAccountSetting
