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
          {t("editor.action.resource.rest_api.label.configure_oauth2")}
        </label>
        <dd css={[descriptionStyle, OAuth2Description]}>
          {t("editor.action.resource.rest_api.tip.configure_oauth2")}
        </dd>
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxStyle]} {...field}>
              {t(
                "editor.action.resource.rest_api.label.use_client_credentials_auth",
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
            {t("editor.action.resource.rest_api.label.oauth_callback_url")}
          </label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder={t(
                  "editor.action.resource.rest_api.placeholder.oauth_callback_url",
                )}
              />
            )}
            control={control}
            name="oauth2CallbackUrl"
          />
          <button css={[applyGridColIndex(2), actionTextStyle]}>
            {t("editor.action.resource.rest_api.label.copy_url_to_application")}
          </button>

          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), checkboxStyle]} {...field}>
                {t(
                  "editor.action.resource.rest_api.label.share_oauth2_credentials_between_users",
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
          {t("editor.action.resource.rest_api.label.authorization_url")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.rest_api.placeholder.authorization_url",
              )}
            />
          )}
          control={control}
          name="oauthAuthUrl"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.access_token_url")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.rest_api.placeholder.access_token_url",
              )}
            />
          )}
          control={control}
          name="oauth2AccessTokenUrl"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.client_id")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2ClientId"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.client_secret")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2ClientSecret"
        />
      </div>

      <div css={[gridRowContainerStyle, gridRowCenterItemStyle]}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.scopes")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="oauth2Scope"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.audience")}
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
              {t("editor.action.resource.rest_api.label.access_token")}
            </label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="oauth2AccessToken"
            />
          </div>
          <div css={gridRowContainerStyle}>
            <label css={labelTextStyle}>
              {t("editor.action.resource.rest_api.label.refresh_token")}
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
          {t("editor.action.resource.rest_api.label.access_token_lifespan")}
        </label>
        <Controller
          render={({ field }) => (
            <InputNumber
              {...field}
              placeholder={t(
                "editor.action.resource.rest_api.placeholder.access_token_lifespan",
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
