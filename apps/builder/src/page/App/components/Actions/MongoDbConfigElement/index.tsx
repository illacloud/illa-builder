import { FC, useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  PreviousIcon,
  RadioGroup,
  Switch,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import { MongoDbGuiMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbGuiMode"
import { MongoDbUriMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbUriMode"
import {
  configItem,
  configItemTip,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  MongoDbConfig,
  MongoDbResource,
  MongoDbResourceInitial,
  MongoDbSSL,
} from "@/redux/resource/mongodbResource"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { sslStyle } from "../MysqlLikeConfigElement/style"
import { MongoDbConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  footerStyle,
  sslItem,
} from "./style"

export const MongoDbConfigElement: FC<MongoDbConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const message = useMessage()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  let content: MongoDbResource<MongoDbConfig>

  if (findResource === undefined) {
    content = MongoDbResourceInitial
  } else {
    content = findResource.content as MongoDbResource<MongoDbConfig>
  }

  const [configType, setConfigType] = useState(content.configType)

  const [sslOpen, setSSLOpen] = useState(content.ssl.open ?? false)
  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleSwitchValueChange = useCallback((open: boolean | string) => {
    setSSLOpen(!!open)
  }, [])

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (configType === "gui") {
          if (resourceId != undefined) {
            BuilderApi.teamRequest<Resource<MongoDbResource<MongoDbConfig>>>(
              {
                method: "PUT",
                url: `/resources/${resourceId}`,
                data: {
                  resourceName: data.resourceName,
                  resourceType: "mongodb",
                  content: {
                    configType: data.configType,
                    ssl: {
                      open: sslOpen,
                      client: data.client,
                      ca: data.ca,
                    } as MongoDbSSL,
                    configContent: {
                      host: data.host,
                      port:
                        data.connectionFormat === "standard"
                          ? data.port.toString()
                          : "",
                      connectionFormat: data.connectionFormat,
                      databaseName: data.databaseName,
                      databaseUsername: data.databaseUsername,
                      databasePassword: data.databasePassword,
                    },
                  },
                },
              },
              (response) => {
                dispatch(
                  resourceActions.updateResourceItemReducer(response.data),
                )
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
            BuilderApi.teamRequest<Resource<MongoDbResource<MongoDbConfig>>>(
              {
                method: "POST",
                url: `/resources`,
                data: {
                  resourceName: data.resourceName,
                  resourceType: "mongodb",
                  content: {
                    configType: data.configType,
                    ssl: {
                      open: sslOpen,
                      client: data.client,
                      ca: data.ca,
                    } as MongoDbSSL,
                    configContent: {
                      host: data.host,
                      port:
                        data.connectionFormat === "standard"
                          ? data.port.toString()
                          : "",
                      connectionFormat: data.connectionFormat,
                      databaseName: data.databaseName,
                      databaseUsername: data.databaseUsername,
                      databasePassword: data.databasePassword,
                    },
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
        } else {
          if (resourceId != undefined) {
            BuilderApi.teamRequest<Resource<MongoDbResource<MongoDbConfig>>>(
              {
                method: "PUT",
                url: `/resources/${resourceId}`,
                data: {
                  resourceName: data.resourceName,
                  resourceType: "mongodb",
                  content: {
                    configType: data.configType,
                    ssl: {
                      open: sslOpen,
                      client: data.client,
                      ca: data.ca,
                    } as MongoDbSSL,
                    configContent: {
                      uri: data.uri,
                    },
                  },
                },
              },
              (response) => {
                dispatch(
                  resourceActions.updateResourceItemReducer(response.data),
                )
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
            BuilderApi.teamRequest<Resource<MongoDbResource<MongoDbConfig>>>(
              {
                method: "POST",
                url: `/resources`,
                data: {
                  resourceName: data.resourceName,
                  resourceType: "mongodb",
                  content: {
                    configType: data.configType,
                    ssl: {
                      open: sslOpen,
                      client: data.client,
                      ca: data.ca,
                    } as MongoDbSSL,
                    configContent: {
                      uri: data.uri,
                    },
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
              {t("editor.action.resource.db.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={findResource?.resourceName ?? ""}
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
                placeholder={t("editor.action.resource.db.placeholder.name")}
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
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.db.label.config_type")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={content.configType}
            render={({ field: { value, onChange, onBlur } }) => (
              <RadioGroup
                w="100%"
                colorScheme="gray"
                ml="16px"
                mr="24px"
                type="button"
                forceEqualWidth={true}
                onBlur={onBlur}
                onChange={(v, event) => {
                  onChange(v, event)
                  setConfigType(v)
                }}
                value={value}
                options={[
                  {
                    value: "gui",
                    label: "General",
                  },
                  {
                    value: "uri",
                    label: "URI",
                  },
                ]}
              />
            )}
            name="configType"
          />
        </div>
        {configType === "gui" && (
          <MongoDbGuiMode control={control} resourceId={resourceId} />
        )}
        {configType === "uri" && (
          <MongoDbUriMode control={control} resourceId={resourceId} />
        )}

        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl.open}
          name="open"
          onValueChange={handleSwitchValueChange}
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />

        {sslOpen && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_client")}
              control={control}
              defaultValue={content.ssl.client}
              name="client"
              placeholders={[
                t("editor.action.resource.db.placeholder.mongo_certificate"),
              ]}
            />

            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.mongodb_ssl_ca")}
              control={control}
              defaultValue={content.ssl.ca}
              name="ca"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
          </>
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
            colorScheme="gray"
            loading={testLoading}
            disabled={!formState.isValid}
            type="button"
            onClick={() => {
              const data = getValues()
              if (configType === "gui") {
                BuilderApi.teamRequest<
                  Resource<MongoDbResource<MongoDbConfig>>
                >(
                  {
                    method: "POST",
                    url: `/resources/testConnection`,
                    data: {
                      resourceId: data.resourceId,
                      resourceName: data.resourceName,
                      resourceType: "mongodb",
                      content: {
                        configType: data.configType,
                        ssl: {
                          open: sslOpen,
                          client: data.client,
                          ca: data.ca,
                        } as MongoDbSSL,
                        configContent: {
                          host: data.host,
                          port:
                            data.connectionFormat === "standard"
                              ? data.port.toString()
                              : "",
                          connectionFormat: data.connectionFormat,
                          databaseName: data.databaseName,
                          databaseUsername: data.databaseUsername,
                          databasePassword: data.databasePassword,
                        },
                      },
                    },
                  },
                  (response) => {
                    message.success({
                      content: t("dashboard.resource.test_success"),
                    })
                  },
                  (error) => {
                    message.error({
                      content: error.data.errorMessage,
                    })
                  },
                  () => {
                    message.error({
                      content: t("dashboard.resource.test_fail"),
                    })
                  },
                  (loading) => {
                    setTestLoading(loading)
                  },
                )
              } else {
                BuilderApi.teamRequest<
                  Resource<MongoDbResource<MongoDbConfig>>
                >(
                  {
                    method: "POST",
                    url: `/resources/testConnection`,
                    data: {
                      resourceId: data.resourceId,
                      resourceName: data.resourceName,
                      resourceType: "mongodb",
                      content: {
                        configType: data.configType,
                        ssl: {
                          open: sslOpen,
                          client: data.client,
                          ca: data.ca,
                        } as MongoDbSSL,
                        configContent: {
                          uri: data.uri,
                        },
                      },
                    },
                  },
                  (response) => {
                    message.success({
                      content: t("dashboard.resource.test_success"),
                    })
                  },
                  (error) => {
                    message.error({
                      content: error.data.errorMessage,
                    })
                  },
                  () => {
                    message.error({
                      content: t("dashboard.resource.test_fail"),
                    })
                  },
                  (loading) => {
                    setTestLoading(loading)
                  },
                )
              }
            }}
          >
            {t("editor.action.form.btn.test_connection")}
          </Button>
          <Button
            colorScheme="techPurple"
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

MongoDbConfigElement.displayName = "MongoDbConfigElement"
