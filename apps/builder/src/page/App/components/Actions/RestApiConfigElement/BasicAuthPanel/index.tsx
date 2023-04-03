import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/RestApiConfigElement/interface"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { BasicAuth } from "@/redux/resource/restapiResource"
import { validate } from "@/utils/form"

export const BasicAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as BasicAuth
  const { t } = useTranslation()

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.restapi.label.basic_auth_username")}
        defaultValue={auth?.username ?? ""}
        name="username"
        isRequired
        controlledType="input"
        control={control}
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
        isRequired
        controlledType="password"
        control={control}
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
