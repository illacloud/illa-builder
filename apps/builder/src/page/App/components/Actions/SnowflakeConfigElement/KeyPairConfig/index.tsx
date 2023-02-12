import { FC } from "react"
import { Control } from "react-hook-form"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { SnowflakeKeyAuthenticationType } from "@/redux/resource/snowflakeResource"

export const KeyPairConfig: FC<
  SnowflakeKeyAuthenticationType & {
    control: Control
  }
> = (props) => {
  const { username, privateKey, control } = props
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
        controlledType={["textarea"]}
        control={control}
        isRequired
        rules={[
          {
            required: true,
          },
        ]}
        title={"Private Key"}
        name={"privateKey"}
        defaultValue={privateKey}
        placeholders={[
          "-----BEGIN ENCRYPTED PRIVATE KEY----- •••••••• -----END ENCRYPTED PRIVATE KEY-----",
        ]}
      />
    </>
  )
}

KeyPairConfig.displayName = "KeyPairConfig"
