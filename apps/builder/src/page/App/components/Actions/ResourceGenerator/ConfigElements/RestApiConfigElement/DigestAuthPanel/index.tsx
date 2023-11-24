import { DigestAuth } from "@illa-public/public-types"
import { FC } from "react"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { ControlledType } from "@/page/App/components/Actions/ControlledElement/interface"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/interface"
import { DigestAuthInfo } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/RestApiConfigElement/values"

export const DigestAuthPanel: FC<RestApiAuthPanelProps> = (props) => {
  const { control } = props
  const auth = props.auth as DigestAuth

  return (
    <>
      {DigestAuthInfo.map((item) => {
        return (
          <ControlledElement
            key={item.name}
            title={item.title}
            defaultValue={
              auth?.[item.name as keyof DigestAuth] ?? item.defaultValue
            }
            name={item.name}
            controlledType={item.controlledType as ControlledType}
            control={control}
            isRequired={item.required}
          />
        )
      })}
    </>
  )
}

DigestAuthPanel.displayName = "DigestAuthPanel"
