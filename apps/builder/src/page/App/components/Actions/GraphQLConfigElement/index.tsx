import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  WarningCircleIcon,
} from "@illa-design/react"
import {
  errorIconStyle,
  errorMsgStyle,
} from "@/page/App/components/Actions/ClickhouseConfigElement/style"
import { APIKeyAuthPanel } from "@/page/App/components/Actions/GraphQLConfigElement/APIKeyAuthPanel"
import { BasicAuthPanel } from "@/page/App/components/Actions/GraphQLConfigElement/BasicAuthPanel"
import { BearerAuthPanel } from "@/page/App/components/Actions/GraphQLConfigElement/BearerAuthPanel"
import {
  generateGraphQLAuthContent,
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  container,
  divider,
  footerStyle,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { InputRecordEditor } from "@/page/App/components/InputRecordEditor"
import {
  ApiKeyAuth,
  BasicAuth,
  BearerAuth,
  GraphQLAuth,
  GraphQLAuthTypeSelect,
  GraphQLAuthValue,
  GraphQLResource,
} from "@/redux/resource/graphqlResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"

export const GraphQLConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, onFinished, resourceID } = props

  const { t } = useTranslation()
  const { control, handleSubmit, formState, getValues, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
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

  const [saving, setSaving] = useState(false)
  const [testLoading, setTestLoading] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const authType = watch(
    "authentication",
    resource?.content.authentication ?? GraphQLAuthValue.NONE,
  )

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "graphql",
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        baseUrl: data.baseUrl.trim(),
        urlParams: data.urlParams,
        headers: data.headers,
        cookies: data.cookies,
        authentication: data.authentication,
        disableIntrospection: data.disableIntrospection,
        authContent: generateGraphQLAuthContent(data)!,
      },
      "graphql",
      setTestLoading,
    )
  }, [track, getValues])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "graphql",
        onFinished,
        setSaving,
      )}
    >
      <div css={container}>
        <div css={divider} />
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
            auth={resource?.content.authContent as BasicAuth}
          />
        )}
        {authType === GraphQLAuthValue.BEARER && (
          <BearerAuthPanel
            control={control}
            auth={resource?.content.authContent as BearerAuth}
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

      <div css={footerStyle}>
        <Button
          leftIcon={<PreviousIcon />}
          variant="text"
          colorScheme="gray"
          type="button"
          onClick={onBack}
        >
          {t("back")}
        </Button>
        <ButtonGroup spacing="8px">
          <Button
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={handleConnectionTest}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
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

GraphQLConfigElement.displayName = "GraphQLConfigElement"
