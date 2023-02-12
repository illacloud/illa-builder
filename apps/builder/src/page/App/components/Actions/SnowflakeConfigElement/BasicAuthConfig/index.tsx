import { FC } from "react"
import { Control } from "react-hook-form"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { SnowflakeBasicAuthenticationType } from "@/redux/resource/snowflakeResource"

export const BasicAuthConfig: FC<
  SnowflakeBasicAuthenticationType & {
    control: Control
  }
> = (props) => {
  const { username, password, control } = props
  return (
    <>
      <ControlledElement
        controlledType={["input"]}
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
        title={"Username"}
        name={"username"}
        defaultValue={username}
        placeholders={["illa"]}
      />
      <ControlledElement
        controlledType={["input"]}
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
        title={"Password"}
        name={"password"}
        defaultValue={password}
        placeholders={["••••••••"]}
      />
    </>
  )
}

BasicAuthConfig.displayName = "BasicAuthConfig"
