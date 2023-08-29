import { FC, useCallback, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import { useOAuthRefresh } from "@/hooks/useOAuthRefresh"
import { ResourceDivider } from "@/page/App/components/Actions/ResourceDivider"
import { onActionConfigElementSubmit } from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  footerStyle,
  getOAuthStatusContentStyle,
  oAuthErrorIconStyle,
  oAuthStatusContainerStyle,
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

export const GoogleSheetsConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceID, onBack, onFinished } = props

  const { handleSubmit, control, watch, formState } = useForm({
    shouldUnregister: true,
    mode: "onChange",
  })

  const { t } = useTranslation()
  const resource = useSelector(getAllResources).find(
    (r) => r.resourceID === resourceID,
  )

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

  const [saving, setSaving] = useState<boolean>(false)

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

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "googlesheets",
        (resourceID) => {
          handleOAuthConnect(resourceID, accessType)
          onFinished(resourceID)
        },
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
              onClick={() => handleOAuthConnect(resourceID!!, accessType)}
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
