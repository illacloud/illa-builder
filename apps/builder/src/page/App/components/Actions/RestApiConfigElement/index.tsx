import { FC, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  PreviousIcon,
  Select,
  getColor,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { BasicAuthPanel } from "@/page/App/components/Actions/RestApiConfigElement/BasicAuthPanel"
import { BearerAuthPanel } from "@/page/App/components/Actions/RestApiConfigElement/BearerAuthPanel"
import {
  configItem,
  configItemTip,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource } from "@/redux/resource/resourceState"
import {
  BasicAuth,
  BearerAuth,
  RestApiAuth,
  RestApiAuthType,
  RestApiResource,
} from "@/redux/resource/restapiResource"
import { RootState } from "@/store"
import { RestApiConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  footerStyle,
} from "./style"

function generateAuthContent(data: { [p: string]: any }): RestApiAuth | null {
  let authContent: RestApiAuth | null = null
  switch (data.authentication) {
    case "basic":
      authContent = {
        username: data.username,
        password: data.password,
      }
      break
    case "bearer":
      authContent = {
        token: data.token,
      }
      break
    default:
      break
  }
  return authContent
}

export const RestApiConfigElement: FC<RestApiConfigElementProps> = (props) => {
  const { onBack, onFinished, resourceId } = props

  const { t } = useTranslation()
  const dispatch = useDispatch()
  const message = useMessage()

  const { control, handleSubmit, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId) as Resource<
      RestApiResource<RestApiAuth>
    >
  })

  const [saving, setSaving] = useState(false)

  const [authType, setAuthType] = useState(
    resource?.content.authentication ?? "none",
  )

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          BuilderApi.teamRequest<Resource<RestApiResource<RestApiAuth>>>(
            {
              method: "PUT",
              url: `/resources/${resourceId}`,
              data: {
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                resourceType: "restapi",
                content: {
                  baseUrl: data.baseUrl,
                  urlParams: data.urlParams,
                  headers: data.headers,
                  cookies: data.cookies,
                  authentication: data.authentication,
                  authContent: generateAuthContent(data),
                },
              },
            },
            (response) => {
              dispatch(resourceActions.updateResourceItemReducer(response.data))
              message.success({
                content: t("dashboard.resource.save_success"),
              })
              onFinished(response.data.resourceId)
            },
            () => {
              message.error({
                content: t("dashboard.resource.save_fail"),
              })
            },
            () => {
              message.error({
                content: t("dashboard.resource.save_fail"),
              })
            },
            (loading) => {
              setSaving(loading)
            },
          )
        } else {
          BuilderApi.teamRequest<Resource<RestApiResource<RestApiAuth>>>(
            {
              method: "POST",
              url: `/resources`,
              data: {
                resourceName: data.resourceName,
                resourceType: "restapi",
                content: {
                  baseUrl: data.baseUrl,
                  urlParams: data.urlParams,
                  headers: data.headers,
                  cookies: data.cookies,
                  authentication: data.authentication,
                  authContent: generateAuthContent(data),
                },
              },
            },
            (response) => {
              onFinished(response.data.resourceId)
              dispatch(resourceActions.addResourceItemReducer(response.data))
              message.success({
                content: t("dashboard.resource.save_success"),
              })
            },
            () => {
              message.error({
                content: t("dashboard.resource.save_fail"),
              })
            },
            () => {
              message.error({
                content: t("dashboard.resource.save_fail"),
              })
            },
            (loading) => {
              setSaving(loading)
            },
          )
        }
      })}
    >
      <div css={container}>
        <div css={divider} />
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.restapi.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.resourceName ?? ""}
            rules={{
              validate: (value) => value != undefined && value.trim() != "",
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t(
                  "editor.action.resource.restapi.placeholder.name",
                )}
              />
            )}
            name="resourceName"
          />
        </div>
        <div css={configItemTip}>
          {t("editor.action.resource.restapi.tip.name")}
        </div>
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.restapi.title.advanced_option")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.restapi.label.base_url")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.content.baseUrl ?? ""}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Input
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                colorScheme="techPurple"
                placeholder={t(
                  "editor.action.resource.restapi.placeholder.base_url",
                )}
              />
            )}
            name="baseUrl"
          />
        </div>
        <Controller
          control={control}
          defaultValue={
            resource?.content.urlParams ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange, onBlur } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.url_parameters")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="urlParams"
        />
        <Controller
          control={control}
          defaultValue={
            resource?.content.headers ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.headers")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="headers"
        />
        <Controller
          control={control}
          defaultValue={
            resource?.content.cookies ?? [
              {
                key: "",
                value: "",
              },
            ]
          }
          render={({ field: { value, onChange } }) => (
            <InputRecordEditor
              label={t("editor.action.resource.restapi.label.cookies")}
              records={value}
              onAdd={() => {
                onChange([...value, { key: "", value: "" }])
              }}
              onDelete={(index, record) => {
                let newRecords = [...value]
                newRecords.splice(index, 1)
                if (newRecords.length === 0) {
                  newRecords = [{ key: "", value: "" }]
                }
                onChange(newRecords)
              }}
              onChangeKey={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
              onChangeValue={(index, key, v) => {
                let newRecords = [...value]
                newRecords[index] = { key, value: v }
                onChange(newRecords)
              }}
            />
          )}
          name="cookies"
        />
        <div css={configItem}>
          <div css={labelContainer}>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.restapi.label.authentication")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.content.authentication ?? "none"}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => (
              <Select
                value={value}
                onBlur={onBlur}
                onChange={(value) => {
                  setAuthType(value as RestApiAuthType)
                  onChange(value)
                }}
                ml="16px"
                mr="24px"
                colorScheme="techPurple"
                options={["none", "basic", "bearer"]}
              />
            )}
            name="authentication"
          />
        </div>
        {authType === "basic" && (
          <BasicAuthPanel
            control={control}
            auth={resource?.content.authContent as BasicAuth}
          />
        )}
        {authType === "bearer" && (
          <BearerAuthPanel
            control={control}
            auth={resource?.content.authContent as BearerAuth}
          />
        )}
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={() => {
            onBack()
          }}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="techPurple"
            value="creating"
            disabled={!formState.isValid}
            loading={saving}
            type="submit"
          >
            {t("editor.action.form.btn.save_changes")}
          </Button>
        </ButtonGroup>
      </div>
    </form>
  )
}

RestApiConfigElement.displayName = "RestApiConfigElement"
