import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { InputNumber } from "@illa-design/input-number"
import { Checkbox } from "@illa-design/checkbox"
import { Controller } from "react-hook-form"
import {
  labelTextStyle,
  descriptionStyle,
  applyGridColIndex,
  actionTextStyle,
  checkboxStyle,
  gridRowContainerStyle,
  gridRowCenterItemStyle,
} from "@/page/Editor/components/ActionEditor/Resource/style"
import { OAuth2Props } from "./interface"
import { OAuth2Description } from "../style"

export const OAuth2: FC<OAuth2Props> = (props) => {
  const { control, watch } = props
  const { t } = useTranslation()

  const isUseClientCredentialsAuth = watch("UseClientCredentialsAuth")

  return (
    <>
      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.configureOAuth2")}
        </label>
        <dd css={[descriptionStyle, OAuth2Description]}>
          {t("editor.action.resource.restApi.tip.configureOAuth2")}
        </dd>
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxStyle]} {...field}>
              {t(
                "editor.action.resource.restApi.label.useClientCredentialsAuth",
              )}
            </Checkbox>
          )}
          control={control}
          name="oauth2UseClientCredentialsAuth"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <div css={gridRowContainerStyle}>
          <label css={labelTextStyle}>
            {t("editor.action.resource.restApi.label.oAuthCallbackUrl")}
          </label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t(
                  "editor.action.resource.restApi.placeholder.oAuthCallbackUrl",
                )}
              />
            )}
            control={control}
            name="oauth2CallbackUrl"
          />
          <button css={[applyGridColIndex(2), actionTextStyle]}>
            {t("editor.action.resource.restApi.label.copyUrlToApplication")}
          </button>

          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), checkboxStyle]} {...field}>
                {t(
                  "editor.action.resource.restApi.label.shareOAuth2CredentialsBetweenUsers",
                )}
              </Checkbox>
            )}
            control={control}
            name="oauth2ShareUserCredentials"
          />
        </div>
      )}

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.authorizationUrl")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.restApi.placeholder.authorizationUrl",
              )}
            />
          )}
          control={control}
          name="oauthAuthUrl"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.accessTokenUrl")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.restApi.placeholder.accessTokenUrl",
              )}
            />
          )}
          control={control}
          name="oauth2AccessTokenUrl"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.clientId")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2ClientId"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.clientSecret")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2ClientSecret"
        />
      </div>

      <div css={[gridRowContainerStyle, gridRowCenterItemStyle]}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.scopes")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2Scope"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.audience")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2Audience"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.restApi.label.accessToken")}
            </label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="oauth2AccessToken"
            />
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.restApi.label.refreshToken")}
            </label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="oauth2RefreshToken"
            />
          </div>
        </>
      )}

      <div css={[gridRowContainerStyle, gridRowCenterItemStyle]}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.accessTokenLifespan")}
        </label>
        <Controller
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder={t(
                "editor.action.resource.restApi.placeholder.accessTokenLifespan",
              )}
            />
          )}
          control={control}
          name="oauth2AccessTokenLifespanSeconds"
        />
      </div>
    </>
  )
}
