import { FC } from "react"
import { Input } from "@illa-design/input"
import { Controller } from "react-hook-form"
import { BearerAuthProps } from "./interface"
import i18n from "@/i18n/config"
import { labelTextStyle } from "../MySQLConfigure/style"

export const BearerAuth: FC<BearerAuthProps> = props => {
  const { control } = props

  return (
    <>
      <label css={labelTextStyle}>
        {i18n.t("editor.action.resource.restapi.label.bearerToken")}
      </label>
      <Controller
        render={({ field }) => <Input {...field} maxLength={200} />}
        control={control}
        name="authContent.token"
      />
    </>
  )
}

BearerAuth.displayName = "BearerAuth"
