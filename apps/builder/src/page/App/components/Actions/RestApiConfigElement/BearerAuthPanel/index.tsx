import { FC } from "react"
import {
  applyConfigItemLabelText,
  configItem,
  labelContainer,
} from "@/page/App/components/Actions/RestApiConfigElement/style"
import { getColor } from "@illa-design/theme"
import { Controller } from "react-hook-form"
import { Input } from "@illa-design/input"
import { BearerAuthPanelProps } from "./interface"
import { useTranslation } from "react-i18next"

export const BearerAuthPanel: FC<BearerAuthPanelProps> = props => {
  const { control, auth } = props

  const { t } = useTranslation()

  return (
    <div css={configItem}>
      <div css={labelContainer}>
        <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
        <span css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}>
          {t("editor.action.resource.restapi.label.bearerToken")}
        </span>
      </div>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        defaultValue={auth?.token}
        shouldUnregister={true}
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            w="100%"
            ml="16px"
            mr="24px"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            borderColor="techPurple"
          />
        )}
        name="token"
      />
    </div>
  )
}

BearerAuthPanel.displayName = "BearerAuthPanel"
