import { FC, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { useLocation } from "react-router-dom"
import {
  Button,
  ButtonGroup,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import { GoogleOAuthContext } from "@/context/GoogleOAuthContext"
import { useOAuthRefresh } from "@/hooks/useOAuthRefresh"
import { ResourceDivider } from "@/page/App/components/Actions/ResourceDivider"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  footerStyle,
  oAuthErrorIconStyle,
  oAuthStatusContainerStyle,
  oAuthStatusContentStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import {
  AccessType,
  GoogleSheetAuthStatus,
  GoogleSheetResource,
  GoogleSheetResourceInitial,
} from "@/redux/resource/googleSheetResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { getOAuthAccessToken, redirectToGoogleOAuth } from "@/services/resource"
import { validate } from "@/utils/form"
import { ILLABuilderStorage } from "@/utils/storage"

export const GoogleSheetsConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceId, onBack, onFinished } = props
  const { oAuthStatus = GoogleSheetAuthStatus.Initial, setOAuthStatus } =
    useContext(GoogleOAuthContext)
  const location = useLocation()

  const { handleSubmit, control, watch, formState } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  })

  const { t } = useTranslation()
  const { oAuthRefreshStatus } = useOAuthRefresh(resourceId)
  const resource = useSelector(getAllResources).find(
    (r) => r.resourceId === resourceId,
  )
  const content = (resource?.content ??
    GoogleSheetResourceInitial) as GoogleSheetResource

  const authenticationWatch = watch("authentication", content.authentication)
  const accessType = watch("accessType", content?.opts.accessType ?? "rw")

  const isOauthType = authenticationWatch === "oauth2"
  // redirect authentication status
  const isAuthenticated =
    resourceId && isOauthType && oAuthStatus !== GoogleSheetAuthStatus.Initial

  const showInitialConnectButton = resourceId
    ? isOauthType && oAuthRefreshStatus !== GoogleSheetAuthStatus.Authenticated
    : isOauthType

  const [saving, setSaving] = useState<boolean>(false)

  const handleLinkTo = useCallback(
    (link: string) => () => {
      window.open(link, "_blank")
    },
    [],
  )

  const handleOAuthConnect = async (id: string, accessType: AccessType) => {
    try {
      const response = await getOAuthAccessToken(
        id,
        `${window.location.origin}${location.pathname}`,
        accessType,
      )
      const { accessToken } = response.data
      if (accessToken) {
        ILLABuilderStorage.setLocalStorage("accessToken", accessToken)
        const res = await redirectToGoogleOAuth(id, accessToken)
        if (res.data.url) {
          window.location.assign(res.data.url)
        }
      }
    } catch (e) {
      ILLABuilderStorage.removeLocalStorage("accessToken")
    }
  }

  const handleOauthInitialConnect = (resourceId: string) => {
    if (showInitialConnectButton && !isAuthenticated) {
      setTimeout(() => {
        handleOAuthConnect(resourceId, accessType)
      }, 100)
    }
    if (isAuthenticated) {
      setOAuthStatus(GoogleSheetAuthStatus.Initial)
    }
    onFinished(resourceId)
  }

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "googlesheets",
        handleOauthInitialConnect,
        setSaving,
      )}
    >
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
          options={[
            {
              label: t("editor.action.form.option.gs.service_account"),
              value: "serviceAccount",
            },
            {
              label: t("editor.action.form.option.gs.oauth_2.0"),
              value: "oauth2",
            },
          ]}
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
        {isAuthenticated && (
          <div css={oAuthStatusContainerStyle}>
            <div css={oAuthStatusContentStyle}>
              {oAuthStatus === GoogleSheetAuthStatus.NotAuthenticated ? (
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
            <Button
              colorScheme="gray"
              disabled={!formState.isValid}
              type="button"
              onClick={() => handleOAuthConnect(resourceId!, accessType)}
            >
              {t("editor.action.form.label.gs.reconnect_with_oauth")}
            </Button>
            <Button
              colorScheme="techPurple"
              disabled={!formState.isValid}
              loading={saving}
              type="submit"
            >
              {t("editor.action.form.btn.save_changes")}
            </Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup spacing="8px">
            <Button
              colorScheme="techPurple"
              disabled={!formState.isValid}
              loading={saving}
              type="submit"
            >
              {showInitialConnectButton
                ? t("editor.action.form.label.gs.connect_with_oauth")
                : t("editor.action.form.btn.save_changes")}
            </Button>
          </ButtonGroup>
        )}
      </div>
    </form>
  )
}
GoogleSheetsConfigElement.displayName = "GoogleSheetsConfigElement"
