import { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProviderProps } from "./interface"
import { formContainerStyle } from "./style"

export const ConfigElementProvider: FC<ConfigElementProviderProps> = (
  props,
) => {
  const { children, resourceType, resourceID, onFinished } = props
  const methods = useForm({ mode: "onChange", shouldUnregister: true })

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={onActionConfigElementSubmit(
          methods.handleSubmit,
          resourceID,
          resourceType,
          onFinished,
        )}
        css={formContainerStyle}
      >
        {children}
      </form>
    </FormProvider>
  )
}
