import { FC } from "react"
import { Input, Password } from "@illa-design/input"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { labelTextCss } from "@/page/Editor/components/ActionEditor/Resource/style"
import { BasicAuthProps } from "./interface"

export const BasicAuth: FC<BasicAuthProps> = (props) => {
  const { control } = props
  const { t } = useTranslation()

  return (
    <>
      <label css={labelTextCss}>
        {t("editor.action.resource.restApi.label.basicAuthUsername")}
      </label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            placeholder={t(
              "editor.action.resource.restApi.placeholder.username",
            )}
            maxLength={200}
          />
        )}
        control={control}
        name="basicUsername"
      />

      <label css={labelTextCss}>
        {t("editor.action.resource.restApi.label.basicAuthPassword")}
      </label>
      <Controller
        render={({ field }) => (
          <Password
            {...field}
            placeholder={t(
              "editor.action.resource.restApi.placeholder.password",
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
