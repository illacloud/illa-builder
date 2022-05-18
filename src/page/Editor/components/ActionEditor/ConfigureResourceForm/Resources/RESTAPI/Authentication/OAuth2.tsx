import { FC, Fragment } from "react"
import { Input } from "@illa-design/input"
import { InputNumber } from "@illa-design/input-number"
import { Checkbox } from "@illa-design/checkbox"
import { Controller } from "react-hook-form"
import {
  LabelTextCSS,
  DescriptionCSS,
  applyGridColIndex,
  ActionTextCSS,
  CheckboxCSS,
} from "../../style"
import { OAuth2Props } from "./interface"
import { OAuth2Description } from "../style"

export const OAuth2: FC<OAuth2Props> = (props) => {
  const { control, watch } = props

  const isUseClientCredentialsAuth = watch("UseClientCredentialsAuth")

  return (
    <>
      <label css={LabelTextCSS}>Configuring OAuth 2.0</label>
      <dd css={[DescriptionCSS, OAuth2Description]}>
        OAuth 2.0 is a complex spec. ILLA currently supports the server-side
        OAuth 2.0 authentication flow as well as the Client Credentials flow. In
        both cases, you must use the OAUTH2_TOKEN placeholder in order to inform
        ILLA where to place the OAuth access token in the API request. A common
        location for this is as a header such as Authorization: Bearer
        OAUTH2_TOKEN.
      </dd>
      <Controller
        render={({ field }) => (
          <Checkbox css={[applyGridColIndex(2), CheckboxCSS]} {...field}>
            Use client credentials auth
          </Checkbox>
        )}
        control={control}
        name="UseClientCredentialsAuth"
      />

      {!isUseClientCredentialsAuth && (
        <>
          <label css={LabelTextCSS}>OAuth callback URL</label>
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
          <button css={[applyGridColIndex(2), ActionTextCSS]}>
            Copy this URL to your application
          </button>

          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), CheckboxCSS]} {...field}>
                Share OAuth2.0 credentials between users
              </Checkbox>
            )}
            control={control}
            name="ShareOAuth2CredentialsBetweenUsers"
          />
        </>
      )}

      <label css={LabelTextCSS}>Authorization URL</label>
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

      <label css={LabelTextCSS}>Access Token URL</label>
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

      <label css={LabelTextCSS}>Client ID</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="ClientId"
      />

      <label css={LabelTextCSS}>Client Secret</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="ClientSecret"
      />

      <label css={LabelTextCSS}>
        Scopes (separated by <br />a space)
      </label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Scopes"
      />

      <label css={LabelTextCSS}>Audience</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Audience"
      />

      {!isUseClientCredentialsAuth && (
        <>
          <label css={LabelTextCSS}>Access Token</label>
          <Controller
            render={({ field }) => <Input {...field} />}
            control={control}
            name="AccessToken"
          />

          <label css={LabelTextCSS}>Refresh Token</label>
          <Controller
            render={({ field }) => <Input {...field} />}
            control={control}
            name="RefreshToken"
          />
        </>
      )}

      <label css={LabelTextCSS}>
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
          <Checkbox css={[applyGridColIndex(2), CheckboxCSS]} {...field}>
            Enable an auth verification endpoint
          </Checkbox>
        )}
        control={control}
        name="EnableAuthVerificationEndpoint"
      />
    </>
  )
}
