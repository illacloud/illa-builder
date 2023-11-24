import { RestAPIBasicAuth } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/interface"
import { validate } from "@/utils/form"

export const BasicAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as RestAPIBasicAuth
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
