import { RestAPIBearerAuth } from "@illa-public/public-types"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/interface"
import { validate } from "@/utils/form"

export const BearerAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as RestAPIBearerAuth
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
