import { FC } from "react"
import { Input, Password } from "@illa-design/input"
import { Controller } from "react-hook-form"
import { labelTextCss } from "../../style"
import { BasicAuthProps } from "./interface"

export const BasicAuth: FC<BasicAuthProps> = (props) => {
  const { control } = props

  return (
    <>
      <label css={labelTextCss}>Basic Auth username</label>
      <Controller
        render={({ field }) => (
          <Input {...field} placeholder="username" maxLength={200} />
        )}
        control={control}
        name="BasicAuthUsername"
      />

      <label css={labelTextCss}>Basic Auth password</label>
      <Controller
        render={({ field }) => (
          <Password {...field} placeholder="password" maxLength={200} />
        )}
        control={control}
        name="BasicAuthPassword"
      />
    </>
  )
}
