import { FC } from "react"
import { useTranslation } from "react-i18next"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  APIKeyAddToSelect,
  APIKeyAddToValue,
} from "@/redux/resource/graphqlResource"
import { APIKeyAuthPanelProps } from "./interface"

export const APIKeyAuthPanel: FC<APIKeyAuthPanelProps> = (props) => {
  const { control, auth, watch } = props
  const { t } = useTranslation()
  const addToValue = watch("addTo", APIKeyAddToValue.HEADER)

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.db.label.key")}
        isRequired
        defaultValue={auth?.key ?? ""}
        name="key"
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["input"]}
        control={control}
      />
      <ControlledElement
        title={t("editor.action.resource.db.label.value")}
        isRequired
        defaultValue={auth?.value ?? ""}
        name="value"
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["password"]}
        control={control}
      />
      <ControlledElement
        title={t("editor.action.resource.db.label.add_to")}
        isRequired
        defaultValue={auth?.addTo ?? APIKeyAddToValue.HEADER}
        name="addTo"
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["select"]}
        control={control}
        options={APIKeyAddToSelect}
      />
      {addToValue === APIKeyAddToValue.HEADER && (
        <ControlledElement
          title={t("editor.action.resource.db.label.header_prefix")}
          defaultValue={auth?.headerPrefix ?? "Bearer"}
          name="headerPrefix"
          controlledType={["input"]}
          control={control}
        />
      )}
    </>
  )
}

APIKeyAuthPanel.displayName = "APIKeyAuthPanel"
