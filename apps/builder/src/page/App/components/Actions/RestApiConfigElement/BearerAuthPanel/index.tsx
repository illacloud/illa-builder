import { FC } from "react"
import { useTranslation } from "react-i18next"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/RestApiConfigElement/interface"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { BearerAuth } from "@/redux/resource/restapiResource"
import { validate } from "@/utils/form"

export const BearerAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as BearerAuth
  const { t } = useTranslation()

  return (
    <ControlledElement
      title={t("editor.action.resource.restapi.label.bearerToken")}
      defaultValue={auth?.token ?? ""}
      name="token"
      controlledType="input"
      control={control}
      isRequired
      rules={[
        {
          validate,
        },
      ]}
    />
  )
}

BearerAuthPanel.displayName = "BearerAuthPanel"
