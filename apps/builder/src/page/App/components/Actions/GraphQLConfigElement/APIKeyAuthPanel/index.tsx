import { FC, useCallback, useState } from "react"
import { Controller } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Input, getColor } from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItem,
  labelContainer,
} from "@/page/App/components/Actions/GraphQLConfigElement/style"
import { APIKeyAuthPanelProps } from "./interface"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  APIKeyAddToSelect,
  APIKeyAddToValue,
} from "@/redux/resource/graphqlResource"

export const APIKeyAuthPanel: FC<APIKeyAuthPanelProps> = (props) => {
  const { control, auth } = props

  const { t } = useTranslation()
  const [addToValue, setAddToValue] = useState<APIKeyAddToValue>(
    APIKeyAddToValue.HEADER,
  )

  const handleAddToChange = useCallback((value: string | boolean) => {
    setAddToValue(String(value) as APIKeyAddToValue)
  }, [])

  return (
    <>
      <ControlledElement
        title={t("editor.action.resource.restapi.label.bearerToken")}
        isRequired
        defaultValue={auth?.key ?? ""}
        name={"key"}
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["input"]}
        control={control}
      />
      <ControlledElement
        title={t("editor.action.resource.restapi.label.bearerToken")}
        isRequired
        defaultValue={auth?.value ?? ""}
        name={"value"}
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["password"]}
        control={control}
      />
      <ControlledElement
        title={t("editor.action.resource.restapi.label.bearerToken")}
        isRequired
        defaultValue={auth?.addTo ?? APIKeyAddToValue.HEADER}
        name={"addTo"}
        rules={[
          {
            required: true,
          },
        ]}
        controlledType={["select"]}
        onValueChange={handleAddToChange}
        control={control}
        options={APIKeyAddToSelect}
      />
      {addToValue === APIKeyAddToValue.URLPARAMS && (
        <ControlledElement
          title={t("editor.action.resource.restapi.label.bearerToken")}
          defaultValue={auth?.headerPrefix ?? "Bearer"}
          name={"headerPrefix"}
          controlledType={["input"]}
          control={control}
        />
      )}
    </>
  )
}

APIKeyAuthPanel.displayName = "APIKeyAuthPanel"
