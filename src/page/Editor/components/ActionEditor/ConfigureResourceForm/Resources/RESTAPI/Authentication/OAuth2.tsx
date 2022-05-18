import { FC } from "react"
import { Input } from "@illa-design/input"
import { Checkbox } from "@illa-design/checkbox"
import { Controller } from "react-hook-form"
import { LabelTextCSS, DescriptionCSS, applyGridColIndex } from "../../style"
import { OAuth2Props } from "./interface"
import { OAuth2Description, CheckboxCSS } from "../style"

export const OAuth2: FC<OAuth2Props> = (props) => {
  const { control } = props

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
      <Checkbox css={[applyGridColIndex(2), CheckboxCSS]}>
        Use client credentials auth
      </Checkbox>

      <label css={LabelTextCSS}>Configuring callback URL</label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            placeholder="https://oauth.retool.com/oauth/user/oauthcallback"
          />
        )}
        control={control}
        name="Name"
      />
      <a css={applyGridColIndex(2)}>Copy this URL to your application</a>
      <Checkbox css={[applyGridColIndex(2), CheckboxCSS]}>
        Use client credentials auth
      </Checkbox>

      <label css={LabelTextCSS}>Authorization URL</label>
      <Controller
        render={({ field }) => (
          <Input
            {...field}
            placeholder="https://accounts.google.com/o/oauth2/v2/auth"
          />
        )}
        control={control}
        name="Name"
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
        name="Name"
      />

      <label css={LabelTextCSS}>Client ID</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>Client Secret</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>
        Scopes (separated by <br />a space)
      </label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>Audience</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>Access Token</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>Refresh Token</label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <label css={LabelTextCSS}>
        Access Token
        <br /> lifespan(optiinal)
      </label>
      <Controller
        render={({ field }) => <Input {...field} />}
        control={control}
        name="Name"
      />

      <Checkbox css={[applyGridColIndex(2), CheckboxCSS]}>
        Enable an auth verification endpoint
      </Checkbox>
    </>
  )
}
