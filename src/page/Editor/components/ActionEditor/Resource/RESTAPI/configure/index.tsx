import { forwardRef, useState } from "react"
import { css } from "@emotion/react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Select, Option } from "@illa-design/select"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { useDispatch, useSelector } from "react-redux"
import { selectAllResource } from "@/redux/currentApp/action/resource/resourceSelector"
import { resourceActions } from "@/redux/currentApp/action/resource/resourceSlice"
import { useTranslation } from "react-i18next"
import { v4 as uuidV4 } from "uuid"
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
} from "@/page/Editor/components/ActionEditor/Resource/style"
import {
  RESTAPIConfigureProps,
  RESTAPIConfigureValues,
  Params,
} from "../interface"
import { inputTagSmallSizeStyle, topZIndexStyle } from "./style"
import { ParamList } from "./ParamList"
import { BasicAuth, OAuth2 } from "./Authentication"

const EmptyField: Params = { key: "", value: "" }

export const RESTAPIConfigure = forwardRef<
  HTMLFormElement,
  RESTAPIConfigureProps
>((props, ref) => {
  const { resourceId } = props
  const dispatch = useDispatch()
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
      ...(resourceConfig?.config as RESTAPIConfigureValues),
    },
  })

  const [authType, setAuthType] = useState("none")

  const onSubmit: SubmitHandler<RESTAPIConfigureValues> = (data) => {
    dispatch(
      resourceActions.addResourceItemReducer({
        resourceId: uuidV4(),
        resourceName: data.name,
        resourceType: "REST API",
        dbName: "",
        created: Date.now().toString(),
        config: data,
      }),
    )
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
              error={!!errors.name}
              maxLength={200}
            />
          )}
          rules={{
            required: ERROR_REQUIRED_MESSAGE,
          }}
          control={control}
          name="name"
        />
        {errors.name && (
          <div css={css(errorMessageStyle, applyGridColIndex(2))}>
            {errors.name.message}
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
              />
            )}
            control={control}
            name="cookiesToForward"
          />
        </div>
        <Controller
          render={({ field }) => (
            <Checkbox css={css(applyGridColIndex(2), checkboxStyle)} {...field}>
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
