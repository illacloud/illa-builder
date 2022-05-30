import { forwardRef, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Select, Option } from "@illa-design/select"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { useDispatch, useSelector } from "react-redux"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { resourceActions } from "@/redux/action/resource/resourceSlice"
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
import {
  inputTagSmallSizeStyle,
  labelAlignSelfFlexStartStyle,
  topZIndexStyle,
} from "./style"
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
    (i) => i.id === resourceId,
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
        id: uuidV4(),
        name: data.name,
        type: "REST API",
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
      css={[formStyle, gridContainerStyle]}
    >
      <div css={gridRowContainerStyle}>
        <label css={requiredLabelTextStyle}>
          {t("editor.action.resource.restApi.label.name")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t("editor.action.resource.restApi.placeholder.name")}
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
          <div css={[errorMessageStyle, applyGridColIndex(2)]}>
            {errors.name.message}
          </div>
        )}
        <dd css={[applyGridColIndex(2), descriptionStyle]}>
          {t("editor.action.resource.restApi.tip.name")}
        </dd>
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.baseUrl")}
        </label>
        <Controller
          render={({ field }) => (
            <Input
              {...field}
              placeholder={t(
                "editor.action.resource.restApi.placeholder.baseUrl",
              )}
              maxLength={200}
            />
          )}
          control={control}
          name="baseURL"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={[labelTextStyle, labelAlignSelfFlexStartStyle]}>
          {t("editor.action.resource.restApi.label.urlParameters")}
        </label>
        <ParamList control={control} name={"urlParams"} />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={[labelTextStyle, labelAlignSelfFlexStartStyle]}>
          {t("editor.action.resource.restApi.label.headers")}
        </label>
        <ParamList control={control} name={"headers"} />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={[labelTextStyle, labelAlignSelfFlexStartStyle]}>
          {t("editor.action.resource.restApi.label.extraBodyValues")}
        </label>
        <ParamList control={control} name={"body"} />
        <dd css={[applyGridColIndex(2), descriptionStyle]}>
          {t("editor.action.resource.restApi.tip.extraBodyValues")}
        </dd>
      </div>

      <div css={gridRowContainerStyle}>
        <div css={[gridRowContainerStyle, gridRowCenterItemStyle]}>
          <label css={labelTextStyle}>
            {t("editor.action.resource.restApi.label.listOfCookiesToForward")}
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
            <Checkbox css={[applyGridColIndex(2), checkboxStyle]} {...field}>
              {t("editor.action.resource.restApi.label.forwardAllCookies")}
            </Checkbox>
          )}
          control={control}
          name="forwardAllCookies"
        />
      </div>

      <div css={gridRowContainerStyle}>
        <label css={labelTextStyle}>
          {t("editor.action.resource.restApi.label.authentication")}
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
                  "editor.action.resource.restApi.option.Authentication.basicAuth",
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
