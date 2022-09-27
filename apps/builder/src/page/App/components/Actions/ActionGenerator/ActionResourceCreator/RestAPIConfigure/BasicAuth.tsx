import { FC } from "react"
import { Input, Password } from "@illa-design/input"
import { BasicAuthProps } from "./interface"
import { Controller } from "react-hook-form"
import { labelTextStyle } from "@/page/App/components/Actions/ActionGenerator/ActionResourceCreator/MySQLConfigure/style"
import i18n from "@/i18n/config"

export const BasicAuth: FC<BasicAuthProps> = props => {
  const { control } = props

  return (
    <>
      <label css={labelTextStyle}>
        {i18n.t("editor.action.resource.restapi.label.basic_auth_username")}
      </label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            placeholder={i18n.t(
              "editor.action.resource.restapi.placeholder.username",
            )}
            maxLength={200}
            borderColor="techPurple"
          />
        )}
        control={control}
        name="authContent.username"
      />

      <label css={labelTextStyle}>
        {i18n.t("editor.action.resource.restapi.label.basic_auth_password")}
      </label>
      <Controller
        render={({ field }) => (
          <Password
            {...field}
            placeholder={i18n.t(
              "editor.action.resource.restapi.placeholder.password",
            )}
            maxLength={200}
            borderColor="techPurple"
          />
        )}
        control={control}
        name="authContent.password"
      />
    </>
  )
}

BasicAuth.displayName = "BasicAuth"
