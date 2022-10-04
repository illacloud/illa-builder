import { FC } from "react"
import { BasicAuthPanelProps } from "./interface"
import {
  applyConfigItemLabelText,
  configItem,
  labelContainer,
} from "@/page/App/components/Actions/RestApiConfigElement/style"
import { getColor } from "@illa-design/theme"
import { Controller } from "react-hook-form"
import { Input, Password } from "@illa-design/input"
import { useTranslation } from "react-i18next"

export const BasicAuthPanel: FC<BasicAuthPanelProps> = (props) => {
  const { control, auth } = props

  const { t } = useTranslation()

  return (
    <>
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.restapi.label.basic_auth_username")}
          </span>
        </div>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={auth?.username}
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
          name="username"
        />
      </div>
      <div css={configItem}>
        <div css={labelContainer}>
          <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
          <span
            css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
          >
            {t("editor.action.resource.restapi.label.basic_auth_password")}
          </span>
        </div>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={auth?.password}
          shouldUnregister={true}
          render={({ field: { value, onChange, onBlur } }) => (
            <Password
              w="100%"
              ml="16px"
              mr="24px"
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              borderColor="techPurple"
            />
          )}
          name="password"
        />
      </div>
    </>
  )
}

BasicAuthPanel.displayName = "BasicAuthPanel"
