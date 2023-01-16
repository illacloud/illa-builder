import { FC } from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, getColor } from "@illa-design/react"
import { applyConfigItemLabelText } from "@/page/App/components/Actions/RestApiConfigElement/style"
import {
  configItem,
  labelContainer,
} from "@/page/App/components/Actions/styles"
import { BearerAuthPanelProps } from "./interface"

export const BearerAuthPanel: FC<BearerAuthPanelProps> = (props) => {
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
        render={({ field: { value, onChange, onBlur } }) => (
          <Input
            w="100%"
            ml="16px"
            mr="24px"
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            colorScheme="techPurple"
          />
        )}
        name="token"
      />
    </div>
  )
}

BearerAuthPanel.displayName = "BearerAuthPanel"
