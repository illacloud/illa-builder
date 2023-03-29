import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { validate } from "@/utils/form"
import { BasicAuthPanelProps } from "./interface"

export const BasicAuthPanel: FC<BasicAuthPanelProps> = (props) => {
  const { control, auth } = props
  const { t } = useTranslation()

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.restapi.label.basic_auth_username")}
        defaultValue={auth?.username ?? ""}
        name="username"
        controlledType="input"
        control={control}
        isRequired
        rules={[
          {
            validate,
          },
        ]}
      />
      <ControlledElement
        title={t("editor.action.resource.restapi.label.basic_auth_password")}
        defaultValue={auth?.password ?? ""}
        name="password"
        controlledType="password"
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
      />
    </>
  )
}

BasicAuthPanel.displayName = "BasicAuthPanel"
