import { Avatar } from "@illa-public/avatar"
import { AvatarUpload } from "@illa-public/cropper"
import { getCurrentUser } from "@illa-public/user-data"
import { FC, useContext } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, Input, WarningCircleIcon } from "@illa-design/react"
import { Header } from "@/page/setting/components/Header"
import { TeamContext } from "@/page/setting/context"
import { AccountSettingFields } from "@/page/setting/interface"
import { AccountSettingProps } from "./interface"
import Logout from "./logout"
import {
  avatarStyle,
  contentContainerStyle,
  editLabelStyle,
  errorIconStyle,
  errorMsgStyle,
  formContainerStyle,
  formLabelStyle,
  gridItemStyle,
  tipTextStyle,
} from "./style"
import { gridFormFieldStyle } from "./style"

const PCAccountSetting: FC<AccountSettingProps> = (props) => {
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
    <>
      <Header title={t("profile.setting.personal_info")} extra={<Logout />} />
      <div css={contentContainerStyle}>
        <div>
          <AvatarUpload onOk={handleUpdateAvatar}>
            <Avatar
              css={avatarStyle}
              id={userInfo?.userID}
              name={userInfo?.nickname}
              avatarUrl={userInfo?.avatar}
            />
            <span css={editLabelStyle}>Edit</span>
          </AvatarUpload>
        </div>
        <form onSubmit={handleSubmit?.(onSubmit)} css={formContainerStyle}>
          <section css={gridFormFieldStyle}>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("profile.setting.username")}
              </label>
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
                    <WarningCircleIcon css={errorIconStyle} />
                    {formState?.errors.nickname?.message}
                  </div>
                )}
              </div>
            </section>
            <section css={gridItemStyle}>
              <label css={formLabelStyle}>
                {t("profile.setting.email")}
                <span css={tipTextStyle}>
                  {" "}
                  {t("profile.setting.uneditable")}
                </span>
              </label>
              <div>
                <Input
                  size="large"
                  value={userInfo.email}
                  disabled
                  variant="fill"
                  placeholder={userInfo.email}
                  colorScheme="techPurple"
                />
              </div>
            </section>
            <span>
              <Button
                colorScheme="techPurple"
                size="large"
                loading={loading}
                disabled={!isDirty}
              >
                {t("profile.setting.save")}
              </Button>
            </span>
          </section>
        </form>
      </div>
    </>
  )
}

PCAccountSetting.displayName = "AccountSetting"

export default PCAccountSetting
