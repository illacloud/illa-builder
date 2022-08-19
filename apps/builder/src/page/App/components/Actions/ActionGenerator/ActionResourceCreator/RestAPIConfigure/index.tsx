import { forwardRef, useState } from "react"
import { css } from "@emotion/react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Select, Option } from "@illa-design/select"
import { useSelector } from "react-redux"
import {
  formStyle,
  gridContainerStyle,
  labelTextStyle,
  requiredLabelTextStyle,
  applyGridColIndex,
  descriptionStyle,
  errorMessageStyle,
  gridRowContainerStyle,
  dynamicLabelTextStyle,
} from "../MySQLConfigure/style"
import {
  RESTAPIConfigureProps,
  RESTAPIConfigureValues,
  Params,
} from "./interface"
import { topZIndexStyle } from "./style"
import { ParamList } from "./ParamList"
import { BasicAuth } from "./BasicAuth"
import { BearerAuth } from "./BearerAuth"
import { getAllResources } from "@/redux/resource/resourceSelector"
import i18n from "@/i18n/config"

const EmptyField: Params = { key: "", value: "" }

const getOptions = (data: RESTAPIConfigureValues) => {
  return data
}

export const RESTAPIConfigure = forwardRef<
  HTMLFormElement,
  RESTAPIConfigureProps
>((props, ref) => {
  const { resourceId, onSubmit } = props
  const resourceConfig = useSelector(getAllResources).find(
    (i) => i.resourceId === resourceId,
  )
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<RESTAPIConfigureValues>({
    mode: "onSubmit",
    defaultValues: {
      urlParams: [EmptyField],
      headers: [EmptyField],
      authentication: "none",
      /* TODO: @spike hide param that not support yet */
      // forwardAllCookies: false,
      // body: [EmptyField],
      // oauth2UseClientCredentialsAuth: false,
      // oauth2ShareUserCredentials: false,
      resourceName: resourceConfig?.resourceName,
      ...resourceConfig?.content,
    },
  })

  const submitForm: SubmitHandler<RESTAPIConfigureValues> = (data) => {
    onSubmit?.({
      resourceName: data.resourceName,
      resourceType: "restapi",
      content: getOptions(data),
    })
  }

  const renderAuthConfig = () => {
    switch (watch("authentication")) {
      case "basic":
        return <BasicAuth control={control} watch={watch} />
      case "bearer":
        return <BearerAuth control={control} watch={watch} />

      default:
        return null
    }
  }

  return (
    <form
      ref={ref}
      onSubmit={handleSubmit(submitForm)}
      css={css(formStyle, gridContainerStyle)}
    >
      <div css={gridRowContainerStyle}>
        <label css={requiredLabelTextStyle}>
          {i18n.t("editor.action.resource.restapi.label.name")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={i18n.t(
                "editor.action.resource.restapi.placeholder.api",
              )}
              error={!!errors.resourceName}
              maxLength={200}
              borderColor="techPurple"
            />
          )}
          rules={{
            required: i18n.t("editor.action.form.required") as string,
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
          {i18n.t("editor.action.resource.restapi.tip.name")}
        </dd>
      </div>

      <div css={gridRowContainerStyle}>
        <label css={requiredLabelTextStyle}>
          {i18n.t("editor.action.resource.restapi.label.base_url")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              borderColor="techPurple"
              {...field}
              error={!!errors.baseUrl}
              placeholder={i18n.t(
                "editor.action.resource.restapi.placeholder.base_url",
              )}
              maxLength={200}
            />
          )}
          rules={{
            required: i18n.t("editor.action.form.required") as string,
          }}
          control={control}
          name="baseUrl"
        />
        {errors.baseUrl && (
          <div css={css(errorMessageStyle, applyGridColIndex(2))}>
            {errors.baseUrl.message}
          </div>
        )}
      </div>

      <div css={gridRowContainerStyle}>
        <label css={dynamicLabelTextStyle}>
          {i18n.t("editor.action.resource.restapi.label.url_parameters")}
        </label>
        <ParamList control={control} name={"urlParams"} />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={dynamicLabelTextStyle}>
          {i18n.t("editor.action.resource.restapi.label.headers")}
        </label>
        <ParamList control={control} name={"headers"} />
      </div>
      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {i18n.t("editor.action.resource.restapi.label.authentication")}
        </label>
        <Controller
          render={({ field }) => (
            <Select
              size="medium"
              colorScheme="techPurple"
              {...field}
              triggerProps={{ _css: topZIndexStyle }}
            >
              <Option value={"none"}>
                {i18n.t(
                  "editor.action.resource.restapi.option.authentication.none",
                )}
              </Option>
              <Option value={"bearer"}>
                {i18n.t(
                  "editor.action.resource.restapi.option.authentication.bearer",
                )}
              </Option>
              <Option value={"basic"}>
                {i18n.t(
                  "editor.action.resource.restapi.option.authentication.basic_auth",
                )}
              </Option>
              {/* TODO: @spike not support yet */}
              {/* <Option value={"OAuth2"}>
                      {i18n.t(
                      "editor.action.resource.restapi.option.authentication.oauth2",
                      )}
                      </Option> */}
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
