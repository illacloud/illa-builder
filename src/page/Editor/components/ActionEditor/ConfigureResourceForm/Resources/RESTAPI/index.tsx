import { forwardRef, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Select, Option } from "@illa-design/select"
import { RESTAPIFormProps, RESTAPIFormValues } from "./interface"
import {
  FormCSS,
  GridContainerCSS,
  LabelTextCSS,
  RequiredLabelTextCSS,
  applyGridColIndex,
  DescriptionCSS,
  SplitLineCSS,
  GroupTitleCSS,
  EmptyFillingCSS,
  CheckboxCSS,
  ErrorMessageCSS,
} from "../style"
import {
  GridContainerGapCSS,
  InputTagSmallSizeCSS,
  LabelAlignSelfFlexStartCSS,
  TopZIndexCSS,
} from "./style"
import { ParamList } from "./ParamList"
import { BasicAuth, OAuth2 } from "./Authentication"

const ERROR_REQUIRED_MESSAGE = "This is required!"

export const RESTAPI = forwardRef<HTMLFormElement, RESTAPIFormProps>(
  (props, ref) => {
    const {
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm<RESTAPIFormValues>({
      defaultValues: {
        Name: "",
        BaseURL: "",
        URLParameters: [],
        Headers: [],
        ExtraBodyValues: [],
        CookiesToForward: [],
        ForwardAllCookies: false,
        Authentication: "none",
        BasicAuthUsername: "",
        BasicAuthPassword: "",
        UseClientCredentialsAuth: false,
        OAuthCallbackURL: "",
        ShareOAuth2CredentialsBetweenUsers: false,
        AuthorizationURL: "",
        AccessTokenURL: "",
        ClientId: "",
        ClientSecret: "",
        Scopes: "",
        Audience: "",
        AccessToken: "",
        RefreshToken: "",
        AccessTokenLifespan: 0,
        EnableAuthVerificationEndpoint: false,
      },
    })

    const [authType, setAuthType] = useState("none")

    const onSubmit: SubmitHandler<RESTAPIFormValues> = (data) => {
      console.log(data)
      alert(JSON.stringify(data))
    }

    const renderAuthConfig = () => {
      if (authType === "basic") {
        return <BasicAuth control={control} watch={watch} />
      }

      if (authType === "OAuth2") {
        return <OAuth2 control={control} watch={watch} />
      }

      return null
    }

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(onSubmit)}
        css={[FormCSS, GridContainerCSS, GridContainerGapCSS]}
      >
        <label css={RequiredLabelTextCSS}>Name</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder='i.e."Users DB(readonly)" or "Internal Admin API"'
              error={!!errors.Name}
              maxLength={200}
            />
          )}
          rules={{
            required: ERROR_REQUIRED_MESSAGE,
          }}
          control={control}
          name="Name"
        />
        {errors.Name && (
          <div css={[ErrorMessageCSS, applyGridColIndex(2)]}>
            {errors.Name.message}
          </div>
        )}
        <dd css={[applyGridColIndex(2), DescriptionCSS]}>
          The name for resource when creating queries in the ILLA.
        </dd>

        <span css={SplitLineCSS} />

        <h4 css={GroupTitleCSS}>GENERAL</h4>

        <label css={LabelTextCSS}>Base URL</label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder="Use the absolute URL (e.g https://example.com)"
              maxLength={200}
            />
          )}
          control={control}
          name="BaseURL"
        />

        <span css={EmptyFillingCSS} />

        <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>
          URL Parameters
        </label>
        <Controller
          render={({ field }) => <ParamList {...field} />}
          control={control}
          name="URLParameters"
        />

        <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>Headers</label>
        <Controller
          render={({ field }) => <ParamList {...field} />}
          control={control}
          name="Headers"
        />

        <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>
          Extra Body Values
        </label>
        <Controller
          render={({ field }) => <ParamList {...field} />}
          control={control}
          name="ExtraBodyValues"
        />
        <dd css={[applyGridColIndex(2), DescriptionCSS]}>
          Extra body values are not passed for GET or HEAD requests
        </dd>

        <label css={LabelTextCSS}>
          List Of Cookies To
          <br /> Forward
        </label>
        <Controller
          render={({ field }) => (
            <InputTag {...field} size={"small"} _css={InputTagSmallSizeCSS} />
          )}
          control={control}
          name="CookiesToForward"
        />
        <Controller
          render={({ field }) => (
            <Checkbox css={[applyGridColIndex(2), CheckboxCSS]} {...field}>
              Forward All Cookies
            </Checkbox>
          )}
          control={control}
          name="ForwardAllCookies"
        />

        <label css={LabelTextCSS}>Authentication</label>
        <Controller
          render={({ field }) => (
            <Select
              size={"small"}
              onChange={setAuthType}
              value={authType}
              triggerProps={{ _css: TopZIndexCSS }}
            >
              <Option value={"none"}>None</Option>
              <Option value={"basic"}>Basic Auth</Option>
              <Option value={"OAuth2"}>OAuth 2.0</Option>
            </Select>
          )}
          control={control}
          name="Authentication"
        />
        {renderAuthConfig()}
      </form>
    )
  },
)
