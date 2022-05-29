import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Input } from "@illa-design/input"
import { InputNumber } from "@illa-design/input-number"
import { Checkbox } from "@illa-design/checkbox"
import { Controller } from "react-hook-form"
import {
  labelTextCss,
  descriptionCss,
  applyGridColIndex,
  actionTextCss,
  checkboxCss,
  gridRowContainerCss,
  gridRowCenterItemCss,
} from "@/page/Editor/components/ActionEditor/Resource/style"
import { OAuth2Props } from "./interface"
import { OAuth2Description } from "../style"

export const OAuth2: FC<OAuth2Props> = (props) => {
  const { control, watch } = props
  const { t } = useTranslation()

  const isUseClientCredentialsAuth = watch("UseClientCredentialsAuth")

  return (
    <>
      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.configureOAuth2")}
        </label>
        <dd css={[descriptionCss, OAuth2Description]}>
          {t("editor.action.resource.restApi.tip.configureOAuth2")}
        </dd>
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
              {t(
                "editor.action.resource.restApi.label.useClientCredentialsAuth",
              )}
            </Checkbox>
          )}
          control={control}
          name="UseClientCredentialsAuth"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>
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
            name="OAuthCallbackURL"
          />
          <button css={[applyGridColIndex(2), actionTextCss]}>
            {t("editor.action.resource.restApi.label.copyUrlToApplication")}
          </button>

          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
                {t(
                  "editor.action.resource.restApi.label.shareOAuth2CredentialsBetweenUsers",
                )}
              </Checkbox>
            )}
            control={control}
            name="ShareOAuth2CredentialsBetweenUsers"
          />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
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
          name="AuthorizationURL"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
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
          name="AccessTokenURL"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.clientId")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="ClientId"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.clientSecret")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="ClientSecret"
        />
      </div>

      <div css={[gridRowContainerCss, gridRowCenterItemCss]}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.scopes")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="Scopes"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>
          {t("editor.action.resource.restApi.label.audience")}
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="Audience"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>
              {t("editor.action.resource.restApi.label.accessToken")}
            </label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="AccessToken"
            />
          </div>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>
              {t("editor.action.resource.restApi.label.refreshToken")}
            </label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="RefreshToken"
            />
          </div>
        </>
      )}

      <div css={[gridRowContainerCss, gridRowCenterItemCss]}>
        <label css={labelTextCss}>
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
          name="AccessTokenLifespan"
        />
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
              {t(
                "editor.action.resource.restApi.label.enableAuthVerificationEndpoint",
              )}
            </Checkbox>
          )}
          control={control}
          name="EnableAuthVerificationEndpoint"
        />
      </div>
    </>
  )
}
