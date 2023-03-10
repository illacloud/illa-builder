import { FC } from "react"
import { RestApiAuthPanelProps } from "@/page/App/components/Actions/RestApiConfigElement/interface"
import { DigestAuthInfo } from "@/page/App/components/Actions/RestApiConfigElement/values"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { DigestAuth } from "@/redux/resource/restapiResource"

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
            controlledType="input"
            control={control}
            isRequired={item.required}
          />
        )
      })}
    </>
  )
}

DigestAuthPanel.displayName = "DigestAuthPanel"
