import { FC } from "react"
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
} from "../../style"
import { OAuth2Props } from "./interface"
import { OAuth2Description } from "../style"

export const OAuth2: FC<OAuth2Props> = (props) => {
  const { control, watch } = props

  const isUseClientCredentialsAuth = watch("UseClientCredentialsAuth")

  return (
    <>
      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Configuring OAuth 2.0</label>
        <dd css={[descriptionCss, OAuth2Description]}>
          OAuth 2.0 is a complex spec. ILLA currently supports the server-side
          OAuth 2.0 authentication flow as well as the Client Credentials flow.
          In both cases, you must use the OAUTH2_TOKEN placeholder in order to
          inform ILLA where to place the OAuth access token in the API request.
          A common location for this is as a header such as Authorization:
          Bearer OAUTH2_TOKEN.
        </dd>
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
              Use client credentials auth
            </Checkbox>
          )}
          control={control}
          name="UseClientCredentialsAuth"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <div css={gridRowContainerCss}>
          <label css={labelTextCss}>OAuth callback URL</label>
          <Controller
            render={({ field }) => (
              <Input
                {...field}
                placeholder="https://oauth.retool.com/oauth/user/oauthcallback"
              />
            )}
            control={control}
            name="OAuthCallbackURL"
          />
          <button css={[applyGridColIndex(2), actionTextCss]}>
            Copy this URL to your application
          </button>

          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
                Share OAuth2.0 credentials between users
              </Checkbox>
            )}
            control={control}
            name="ShareOAuth2CredentialsBetweenUsers"
          />
        </div>
      )}

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Authorization URL</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://accounts.google.com/o/oauth2/v2/auth"
            />
          )}
          control={control}
          name="AuthorizationURL"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Access Token URL</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder="https://www.googleapis.com/oauth2/v4/token"
            />
          )}
          control={control}
          name="AccessTokenURL"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Client ID</label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="ClientId"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Client Secret</label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="ClientSecret"
        />
      </div>

      <div css={[gridRowContainerCss, gridRowCenterItemCss]}>
        <label css={labelTextCss}>
          Scopes (separated by <br />a space)
        </label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="Scopes"
        />
      </div>

      <div css={gridRowContainerCss}>
        <label css={labelTextCss}>Audience</label>
        <Controller
          render={({ field }) => <Input {...field} />}
          control={control}
          name="Audience"
        />
      </div>

      {!isUseClientCredentialsAuth && (
        <>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Access Token</label>
            <Controller
              render={({ field }) => <Input {...field} />}
              control={control}
              name="AccessToken"
            />
          </div>
          <div css={gridRowContainerCss}>
            <label css={labelTextCss}>Refresh Token</label>
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
          Access Token
          <br /> lifespan(optiinal)
        </label>
        <Controller
          render={({ field }) => (
            <InputNumber {...field} placeholder={"Token Lifespan in seconds"} />
          )}
          control={control}
          name="AccessTokenLifespan"
        />
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), checkboxCss]} {...field}>
              Enable an auth verification endpoint
            </Checkbox>
          )}
          control={control}
          name="EnableAuthVerificationEndpoint"
        />
      </div>
    </>
  )
}
