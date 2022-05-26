import { forwardRef, useState } from "react"
import { useForm, Controller, SubmitHandler } from "react-hook-form"
import { Input } from "@illa-design/input"
import { InputTag } from "@illa-design/input-tag"
import { Checkbox } from "@illa-design/checkbox"
import { Divider } from "@illa-design/divider"
import { Select, Option } from "@illa-design/select"
import { ERROR_REQUIRED_MESSAGE } from "@/page/Editor/constants"
import { useDispatch, useSelector } from "react-redux"
import { selectAllResource } from "@/redux/action/resource/resourceSelector"
import { resourceActions } from "@/redux/action/resource/resourceSlice"
import { v4 as uuidV4 } from "uuid"
import { RESTAPIFormProps, RESTAPIFormValues, Params } from "./interface"
import {
  FormCSS,
  GridContainerCSS,
  LabelTextCSS,
  RequiredLabelTextCSS,
  applyGridColIndex,
  DescriptionCSS,
  SplitLineCSS,
  GroupTitleCSS,
  CheckboxCSS,
  ErrorMessageCSS,
  GridRowContainerCSS,
  GridRowCenterItemCSS,
} from "../style"
import {
  InputTagSmallSizeCSS,
  LabelAlignSelfFlexStartCSS,
  TopZIndexCSS,
} from "./style"
import { ParamList } from "./ParamList"
import { BasicAuth, OAuth2 } from "./Authentication"

const EmptyField: Params = { key: "", value: "" }

export const RESTAPI = forwardRef<HTMLFormElement, RESTAPIFormProps>(
  (props, ref) => {
    const { resourceId } = props
    const dispatch = useDispatch()
    const resourceConfig = useSelector(selectAllResource).find(
      (i) => i.id === resourceId,
    )
    const {
      handleSubmit,
      control,
      watch,
      formState: { errors },
    } = useForm<RESTAPIFormValues>({
      mode: "onBlur",
      defaultValues: (resourceConfig?.config as RESTAPIFormValues) || {
        URLParameters: [EmptyField],
        Headers: [EmptyField],
        ExtraBodyValues: [EmptyField],
        ForwardAllCookies: false,
        Authentication: "none",
        UseClientCredentialsAuth: false,
        ShareOAuth2CredentialsBetweenUsers: false,
        EnableAuthVerificationEndpoint: false,
      },
    })

    const [authType, setAuthType] = useState("none")

    const onSubmit: SubmitHandler<RESTAPIFormValues> = (data) => {
      dispatch(
        resourceActions.addResourceItemReducer({
          id: uuidV4(),
          name: data.Name,
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
        css={[FormCSS, GridContainerCSS]}
      >
        <div css={GridRowContainerCSS}>
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
        </div>

        <Divider css={SplitLineCSS} />

        <h4 css={GroupTitleCSS}>GENERAL</h4>

        <div css={GridRowContainerCSS}>
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
        </div>

        <div css={GridRowContainerCSS}>
          <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>
            URL Parameters
          </label>
          <ParamList control={control} name={"URLParameters"} />
        </div>

        <div css={GridRowContainerCSS}>
          <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>
            Headers
          </label>
          <ParamList control={control} name={"Headers"} />
        </div>

        <div css={GridRowContainerCSS}>
          <label css={[LabelTextCSS, LabelAlignSelfFlexStartCSS]}>
            Extra Body Values
          </label>
          <ParamList control={control} name={"ExtraBodyValues"} />
          <dd css={[applyGridColIndex(2), DescriptionCSS]}>
            Extra body values are not passed for GET or HEAD requests
          </dd>
        </div>

        <div css={GridRowContainerCSS}>
          <div css={[GridRowContainerCSS, GridRowCenterItemCSS]}>
            <label css={LabelTextCSS}>
              List Of Cookies To
              <br /> Forward
            </label>
            <Controller
              render={({ field }) => (
                <InputTag
                  {...field}
                  size={"small"}
                  _css={InputTagSmallSizeCSS}
                />
              )}
              control={control}
              name="CookiesToForward"
            />
          </div>
          <Controller
            render={({ field }) => (
              <Checkbox css={[applyGridColIndex(2), CheckboxCSS]} {...field}>
                Forward All Cookies
              </Checkbox>
            )}
            control={control}
            name="ForwardAllCookies"
          />
        </div>

        <div css={GridRowContainerCSS}>
          <label css={LabelTextCSS}>Authentication</label>
          <Controller
            render={() => (
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
        </div>

        {renderAuthConfig()}
      </form>
    )
  },
)
