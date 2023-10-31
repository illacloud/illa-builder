import { AccessType } from "@illa-public/public-types"
import { FC } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { getOAuthAccessToken, redirectToGoogleOAuth } from "@/services/resource"
import { ConfigElementProviderProps } from "./interface"
import { formContainerStyle } from "./style"

export const ConfigElementProvider: FC<ConfigElementProviderProps> = (
  props,
) => {
  const { children, resourceType, resourceID, onFinished } = props
  const methods = useForm({ mode: "onChange", shouldUnregister: true })

  const googleAuthMethod = async (
    resourceID: string,
    accessType: AccessType,
  ) => {
    const response = await getOAuthAccessToken(
      resourceID,
      `${window.location.origin}${location.pathname}`,
      accessType,
    )
    const { accessToken } = response.data
    if (accessToken) {
      const res = await redirectToGoogleOAuth(resourceID, accessToken)
      if (res.data.url) {
        window.location.assign(res.data.url)
      }
    }
  }

  const handleOnFinished =
    resourceType === "googlesheets"
      ? async (resourceID: string) => {
          googleAuthMethod(resourceID, methods.getValues().accessType ?? "rw")
          onFinished(resourceID)
        }
      : onFinished

  return (
    <FormProvider {...methods}>
      <form
        autoComplete="off"
        onSubmit={onActionConfigElementSubmit(
          methods.handleSubmit,
          resourceID,
          resourceType,
          handleOnFinished,
        )}
        css={formContainerStyle}
      >
        {children}
      </form>
    </FormProvider>
  )
}
