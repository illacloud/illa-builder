import { TextLink } from "@illa-public/text-link"
import { FC, useCallback, useMemo } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  PreviousIcon,
  WarningCircleIcon,
  useMessage,
} from "@illa-design/react"
import { ReactComponent as DisabledGoogleLogoIcon } from "@/assets/googlesheets/disabled-google.svg"
import { ReactComponent as GoogleLogoIcon } from "@/assets/googlesheets/google-logo.svg"
import { useOAuthRefresh } from "@/hooks/useOAuthRefresh"
import { ResourceDivider } from "@/page/App/components/Actions/ResourceDivider"
import {
  container,
  footerStyle,
  getOAuthStatusContentStyle,
  oAuthErrorIconStyle,
  oAuthStatusContainerStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  AccessType,
  GoogleSheetAuthStatus,
  GoogleSheetResource,
  GoogleSheetResourceInitial,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getOAuthAccessToken, redirectToGoogleOAuth } from "@/services/resource"
import { validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { BaseConfigElementProps } from "../interface"
import { googleIconStyle, googleSheetsButtonStyle } from "./style"

const GoogleSheetsConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID, onBack, hasFooter = true } = props

  const { control, watch, formState } = useFormContext()

  const { t } = useTranslation()
  const resource = useSelector(getAllResources).find(
    (r) => r.resourceID === resourceID,
  )
  const message = useMessage()

  const content = (resource?.content ??
    GoogleSheetResourceInitial) as GoogleSheetResource

  const authenticationWatch = watch("authentication", content.authentication)
  const accessType = watch("accessType", content?.opts.accessType ?? "rw")

  const isOauthType = authenticationWatch === "oauth2"
  // redirect authentication status
  const isAuthenticated =
    content.opts?.status === GoogleSheetAuthStatus.Authenticated

  const showAuthStatus = content.opts?.status !== GoogleSheetAuthStatus.Initial

  const showInitialConnectButton = resourceID
    ? isOauthType &&
      content.opts?.status !== GoogleSheetAuthStatus.Authenticated
    : isOauthType

  const handleLinkTo = useCallback(
    (link: string) => () => {
      window.open(link, "_blank")
    },
    [],
  )

  // refresh Google OAuth Status
  useOAuthRefresh(resourceID)

  const oauthMethodOptions = useMemo(() => {
    if (import.meta.env.ILLA_APP_ENV === "production") {
      return [
        {
          label: t("editor.action.form.option.gs.service_account"),
          value: "serviceAccount",
        },
      ]
    } else {
      return [
        {
          label: t("editor.action.form.option.gs.service_account"),
          value: "serviceAccount",
        },
        {
          label: t("editor.action.form.option.gs.oauth_2.0"),
          value: "oauth2",
        },
      ]
    }
  }, [t])

  const handleOAuthConnect = async (
    resourceID: string,
    accessType: AccessType,
  ) => {
    try {
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
      } else {
        throw new Error()
      }
    } catch (e) {
      message.error({
        content: t("editor.action.form.tips.gs.failed_to_authentica"),
      })
    }
  }

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <ResourceDivider type="General Option" />
        <ControlledElement
          isRequired
          title={t("editor.action.form.label.gs.authentication")}
          defaultValue={content.authentication}
          name="authentication"
          controlledType="select"
          control={control}
          options={oauthMethodOptions}
        />
        {isOauthType ? (
          <ControlledElement
            isRequired
            title={t("editor.action.form.label.gs.access_type")}
            key="editor.action.form.label.gs.access_type"
            defaultValue={content.opts?.accessType ?? "rw"}
            name="accessType"
            controlledType="radio"
            control={control}
            options={[
              {
                label: t("editor.action.form.option.gs.read_and_write"),
                value: "rw",
              },
              {
                label: t("editor.action.form.option.gs.read_only"),
                value: "r",
              },
            ]}
          />
        ) : (
          <ControlledElement
            title={t("editor.action.form.label.gs.private_key")}
            key="editor.action.form.label.gs.private_key"
            defaultValue={content.opts?.privateKey ?? ""}
            name="privateKey"
            isRequired
            rules={[
              {
                validate,
              },
            ]}
            controlledType="textarea"
            control={control}
            placeholders={[t("editor.action.form.placeholder.gs.private_key")]}
            tips={
              <Trans
                i18nKey="editor.action.form.tips.gs.private_key"
                t={t}
                components={[
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.console"
                    onClick={handleLinkTo(
                      "https://console.cloud.google.com/cloud-resource-manager",
                    )}
                  />,
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.docs"
                    onClick={handleLinkTo(
                      "https://cloud.google.com/docs/authentication/getting-started",
                    )}
                  />,
                  <TextLink
                    key="editor.action.form.tips.gs.private_key.limit"
                    onClick={handleLinkTo(
                      "https://developers.google.com/sheets/api/limits",
                    )}
                  />,
                ]}
              />
            }
          />
        )}
        {showAuthStatus && (
          <div css={oAuthStatusContainerStyle}>
            <div css={getOAuthStatusContentStyle(isAuthenticated)}>
              {!isAuthenticated ? (
                <>
                  <WarningCircleIcon css={oAuthErrorIconStyle} />
                  <>{t("editor.action.form.tips.gs.failed_to_authentica")}</>
                </>
              ) : (
                <>{t("editor.action.form.tips.gs.successfully_authent")}</>
              )}
            </div>
          </div>
        )}
      </div>
      {hasFooter && (
        <div css={footerStyle}>
          <Button
            leftIcon={<PreviousIcon />}
            variant="text"
            colorScheme="gray"
            type="button"
            onClick={onBack}
          >
            {t("back")}
          </Button>
          {isAuthenticated ? (
            <ButtonGroup spacing="8px">
              <button
                css={googleSheetsButtonStyle}
                type="button"
                onClick={() => handleOAuthConnect(resourceID!!, accessType)}
                disabled={!formState.isValid}
              >
                <span css={googleIconStyle}>
                  {formState.isValid ? (
                    <GoogleLogoIcon />
                  ) : (
                    <DisabledGoogleLogoIcon />
                  )}
                </span>
                <span>
                  {t("editor.action.form.label.gs.reconnect_with_oauth")}
                </span>
              </button>
              <CreateButton
                text={
                  showInitialConnectButton
                    ? t("editor.action.form.label.gs.connect_with_oauth")
                    : t("editor.action.form.btn.save_changes")
                }
              />
            </ButtonGroup>
          ) : (
            <>
              {showInitialConnectButton ? (
                <button
                  css={googleSheetsButtonStyle}
                  type="submit"
                  disabled={!formState.isValid || formState.isSubmitting}
                >
                  <span css={googleIconStyle}>
                    {formState.isValid ? (
                      <GoogleLogoIcon />
                    ) : (
                      <DisabledGoogleLogoIcon />
                    )}
                  </span>
                  <span>
                    {t("editor.action.form.label.gs.connect_with_oauth")}
                  </span>
                </button>
              ) : (
                <CreateButton
                  text={
                    showInitialConnectButton
                      ? t("editor.action.form.label.gs.connect_with_oauth")
                      : t("editor.action.form.btn.save_changes")
                  }
                />
              )}
            </>
          )}
        </div>
      )}
    </>
  )
}
GoogleSheetsConfigElement.displayName = "GoogleSheetsConfigElement"
export default GoogleSheetsConfigElement
