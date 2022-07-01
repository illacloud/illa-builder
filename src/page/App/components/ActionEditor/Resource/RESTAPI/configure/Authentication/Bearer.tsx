import { FC } from "react"
import { Input } from "@illa-design/input"
import { useTranslation } from "react-i18next"
import { Controller } from "react-hook-form"
import { labelTextStyle } from "@/page/App/components/ActionEditor/Resource/style"
import { BearerAuthProps } from "./interface"

export const BearerAuth: FC<BearerAuthProps> = (props) => {
  const { control } = props
  const { t } = useTranslation()

  return (
    <>
      <label css={labelTextStyle}>
        {t("editor.action.resource.rest_api.label.bearerToken")}
      </label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            maxLength={200}
          />
        )}
        control={control}
        name="bearerToken"
      />
    </>
  )
}

BearerAuth.displayName = "BearerAuth"
