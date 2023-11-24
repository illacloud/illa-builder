import {
  ApiKeyAuth,
  GraphQLAuth,
  GraphQLAuthValue,
  GraphQLBasicAuth,
  GraphQLBearerAuth,
  GraphQLResource,
} from "@illa-public/public-types"
import { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider, WarningCircleIcon } from "@illa-design/react"
import { optionLabelStyle } from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { InputRecordEditor } from "@/page/App/components/Actions/InputRecordEditor"
import {
  errorIconStyle,
  errorMsgStyle,
} from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/ClickhouseConfigElement/style"
import { APIKeyAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GraphQLConfigElement/APIKeyAuthPanel"
import { BasicAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GraphQLConfigElement/BasicAuthPanel"
import { BearerAuthPanel } from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/GraphQLConfigElement/BearerAuthPanel"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"
import { GraphQLAuthTypeSelect } from "./constants"

const GraphQLConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props

  const { t } = useTranslation()
  const { control, formState, watch } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID) as Resource<
      GraphQLResource<GraphQLAuth>
    >
  })

  const InputRecord = [
    {
      name: "urlParams",
      title: t("editor.action.resource.restapi.label.url_parameters"),
      defaultValue: resource?.content.urlParams,
    },
    {
      name: "headers",
      defaultValue: resource?.content.headers,
      title: t("editor.action.resource.restapi.label.headers"),
    },
    {
      name: "cookies",
      defaultValue: resource?.content.cookies,
      title: t("editor.action.resource.restapi.label.cookies"),
    },
  ]

  const authType = watch(
    "authentication",
    resource?.content.authentication ?? GraphQLAuthValue.NONE,
  )

  return (
    <>
      <div css={container}>
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.name")}
          control={control}
          defaultValue={resource?.resourceName ?? ""}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.name")]}
          name="resourceName"
          tips={t("editor.action.resource.restapi.tip.name")}
        />
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>

        <ControlledElement
          title={t("editor.action.resource.restapi.label.base_url")}
          defaultValue={resource?.content.baseUrl ?? ""}
          isRequired
          name={"baseUrl"}
          controlledType={"input"}
          control={control}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.restapi.placeholder.base_url"),
          ]}
          tips={
            formState.errors.baseUrl && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.baseUrl.message}</>
              </div>
            )
          }
        />
        {InputRecord.map(({ name, title, defaultValue }) => (
          <Controller
            key={name}
            control={control}
            defaultValue={
              defaultValue ?? [
                {
                  key: "",
                  value: "",
                },
              ]
            }
            render={({ field: { value, onChange } }) => (
              <InputRecordEditor
                label={title}
                records={value}
                onAdd={() => {
                  onChange([...value, { key: "", value: "" }])
                }}
                onDelete={(index) => {
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
                  newRecords[index].value = v
                  onChange(newRecords)
                }}
              />
            )}
            name={name}
          />
        ))}
        <ControlledElement
          title={t("editor.action.resource.restapi.label.authentication")}
          defaultValue={resource?.content.authentication ?? "none"}
          name="authentication"
          controlledType={["select"]}
          control={control}
          options={GraphQLAuthTypeSelect}
        />

        {authType === GraphQLAuthValue.BASIC && (
          <BasicAuthPanel
            control={control}
            auth={resource?.content.authContent as GraphQLBasicAuth}
          />
        )}
        {authType === GraphQLAuthValue.BEARER && (
          <BearerAuthPanel
            control={control}
            auth={resource?.content.authContent as GraphQLBearerAuth}
          />
        )}
        {authType === GraphQLAuthValue.APIKEY && (
          <APIKeyAuthPanel
            watch={watch}
            control={control}
            auth={resource?.content.authContent as ApiKeyAuth}
          />
        )}
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.graphql_introspection")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.db.label.introspection")}
          contentLabel={t(
            "editor.action.resource.db.label.disable_introspection",
          )}
          defaultValue={resource?.content.disableIntrospection ?? false}
          name="disableIntrospection"
          controlledType={["switch"]}
          control={control}
          tips={t("editor.action.resource.db.tip.introspection")}
        />
      </div>
    </>
  )
}

GraphQLConfigElement.displayName = "GraphQLConfigElement"
export default GraphQLConfigElement
