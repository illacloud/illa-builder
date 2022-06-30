import { forwardRef, useState } from "react"
import { css } from "@emotion/react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Select, Option } from "@illa-design/select"
import { useSelector } from "react-redux"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { useTranslation } from "react-i18next"
import {
  formStyle,
  gridContainerStyle,
  labelTextStyle,
  requiredLabelTextStyle,
  applyGridColIndex,
  descriptionStyle,
  checkboxStyle,
  errorMessageStyle,
  gridRowContainerStyle,
  gridRowCenterItemStyle,
} from "@/page/App/components/ActionEditor/Resource/style"
import {
  RESTAPIConfigureProps,
  RESTAPIConfigureValues,
  Params,
} from "../interface"
import { inputTagSmallSizeStyle, topZIndexStyle } from "./style"
import { ParamList } from "./ParamList"
import { BasicAuth, OAuth2 } from "./Authentication"

const EmptyField: Params = { key: "", value: "" }

const getOptions = (data: RESTAPIConfigureValues) => {
  return data
}

export const RESTAPIConfigure = forwardRef<
  HTMLFormElement,
  RESTAPIConfigureProps
>((props, ref) => {
  const { resourceId, onSubmit } = props
  const { t } = useTranslation()
  const resourceConfig = useSelector(selectAllResource).find(
    (i) => i.resourceId === resourceId,
  )
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RESTAPIConfigureValues>({
    mode: "onBlur",
    defaultValues: {
      urlParams: [EmptyField],
      headers: [EmptyField],
      body: [EmptyField],
      forwardAllCookies: false,
      authentication: "none",
      oauth2UseClientCredentialsAuth: false,
      oauth2ShareUserCredentials: false,
      resourceName: resourceConfig?.resourceName,
      ...resourceConfig?.options,
    },
  })

  const [authType, setAuthType] = useState("none")

  const submitForm: SubmitHandler<RESTAPIConfigureValues> = (data) => {
    onSubmit?.({
      resourceName: data.resourceName,
      resourceType: "restapi",
      options: getOptions(data),
    })
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
      onSubmit={handleSubmit(submitForm)}
      css={css(formStyle, gridContainerStyle)}
    >
      <div css={gridRowContainerStyle}>
        <label css={requiredLabelTextStyle}>
          {t("editor.action.resource.rest_api.label.name")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.rest_api.placeholder.name",
              )}
              error={!!errors.resourceName}
              maxLength={200}
              borderColor="techPurple"
            />
          )}
          rules={{
            required: t("editor.action.form.required"),
          }}
          control={control}
          name="resourceName"
        />
        {errors.resourceName && (
          <div css={css(errorMessageStyle, applyGridColIndex(2))}>
            {errors.resourceName.message}
          </div>
        )}
        <dd css={css(applyGridColIndex(2), descriptionStyle)}>
          {t("editor.action.resource.rest_api.tip.name")}
        </dd>
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.base_url")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              borderColor="techPurple"
              {...field}
              placeholder={t(
                "editor.action.resource.rest_api.placeholder.base_url",
              )}
              maxLength={200}
            />
          )}
          control={control}
          name="baseURL"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.url_parameters")}
        </label>
        <ParamList control={control} name={"urlParams"} />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.headers")}
        </label>
        <ParamList control={control} name={"headers"} />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.extra_body_values")}
        </label>
        <ParamList control={control} name={"body"} />
        <dd css={css(applyGridColIndex(2), descriptionStyle)}>
          {t("editor.action.resource.rest_api.tip.extra_body_values")}
        </dd>
      </div>

      <div css={gridRowContainerStyle}>
        <div css={css(gridRowContainerStyle, gridRowCenterItemStyle)}>
          <label css={labelTextStyle}>
            {t(
              "editor.action.resource.rest_api.label.list_of_cookies_to_forward",
            )}
          </label>
          <Controller
            render={({ field }) => (
              <InputTag
                {...field}
                size={"small"}
                _css={inputTagSmallSizeStyle}
                borderColor="techPurple"
              />
            )}
            control={control}
            name="cookiesToForward"
          />
        </div>
        <Controller
          render={({ field }) => (
            <Checkbox
              colorScheme="techPurple"
              css={css(applyGridColIndex(2), checkboxStyle)}
              {...field}
            >
              {t("editor.action.resource.rest_api.label.forward_all_cookies")}
            </Checkbox>
          )}
          control={control}
          name="forwardAllCookies"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.rest_api.label.authentication")}
        </label>
        <Controller
          render={() => (
            <Select
              size={"small"}
              colorScheme="techPurple"
              onChange={setAuthType}
              value={authType}
              triggerProps={{ _css: topZIndexStyle }}
            >
              <Option value={"none"}>None</Option>
              <Option value={"basic"}>
                {t(
                  "editor.action.resource.rest_api.option.authentication.basicAuth",
                )}
              </Option>
              <Option value={"OAuth2"}>OAuth 2.0</Option>
            </Select>
          )}
          control={control}
          name="authentication"
        />
      </div>

      {renderAuthConfig()}
    </form>
  )
})

RESTAPIConfigure.displayName = "RESTAPIConfigure"
