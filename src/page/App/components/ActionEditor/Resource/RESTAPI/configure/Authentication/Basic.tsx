import { FC } from "react"
import { Input, Password } from "@illa-design/input"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { labelTextStyle } from "@/page/App/components/ActionEditor/Resource/style"
import { BasicAuthProps } from "./interface"

export const BasicAuth: FC<BasicAuthProps> = (props) => {
  const { control } = props
  const { t } = useTranslation()

  return (
    <>
      <label css={labelTextStyle}>
        {t("editor.action.resource.rest_api.label.basic_auth_username")}
      </label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.username",
            )}
            maxLength={200}
          />
        )}
        control={control}
        name="basicUsername"
      />

      <label css={labelTextStyle}>
        {t("editor.action.resource.rest_api.label.basic_auth_password")}
      </label>
      <Controller
        render={({ field }) => (
          <Password
            {...field}
            placeholder={t(
              "editor.action.resource.rest_api.placeholder.password",
            )}
            maxLength={200}
          />
        )}
        control={control}
        name="basicPassword"
      />
    </>
  )
}
