import { FC, useCallback, useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  Input,
  InputNumber,
  Password,
  PreviousIcon,
  Switch,
  TextArea,
  getColor,
  useMessage,
} from "@illa-design/react"
import { BuilderApi } from "@/api/base"
import {
  configItem,
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource, generateSSLConfig } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
import { MysqlLikeConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  footerStyle,
  hostInputContainer,
  sslItem,
  sslStyle,
} from "./style"

/**
 * include mariadb or tidb
 * @param props
 * @constructor
 */

const getResourceDefaultPort = (resourceType: string) => {
  switch (resourceType) {
    case "postgresql":
    case "supabasedb":
      return "5432"
    case "mysql":
    case "mariadb":
      return "3306"
    case "tidb":
      return "4000"
    default:
      return "3306"
  }
}

export const MysqlLikeConfigElement: FC<MysqlLikeConfigElementProps> = (
  props,
) => {
  const { onBack, resourceType, resourceId, onFinished } = props

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === resourceId,
    ) as Resource<MysqlLikeResource>
  })

  const [sslOpen, setSSLOpen] = useState(resource?.content.ssl.ssl ?? false)

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const message = useMessage()

  const handleSwitchValueChange = useCallback((open: boolean | string) => {
    setSSLOpen(!!open)
  }, [])

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          BuilderApi.teamRequest<Resource<MysqlLikeResource>>(
            {
              method: "PUT",
              url: `/resources/${resourceId}`,
              data: {
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                resourceType: resource.resourceType,
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseName: data.databaseName,
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
                  ssl: generateSSLConfig(sslOpen, data),
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
            (error) => {
              message.error({
                content: error.data.errorMessage,
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
          BuilderApi.teamRequest<Resource<MysqlLikeResource>>(
            {
              method: "POST",
              url: `/resources`,
              data: {
                resourceName: data.resourceName,
                resourceType,
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseName: data.databaseName,
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
                  ssl: generateSSLConfig(sslOpen, data),
                },
              },
            },
            (response) => {
              dispatch(resourceActions.addResourceItemReducer(response.data))
              message.success({
                content: t("dashboard.resource.save_success"),
              })
              onFinished(response.data.resourceId)
            },
            (error) => {
              message.error({
                content: error.data.errorMessage,
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
              {t("editor.action.resource.db.label.name")}
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
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.hostname_port")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              defaultValue={resource?.content.host}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  placeholder={t(
                    "editor.action.resource.db.placeholder.hostname",
                  )}
                />
              )}
              name="host"
            />
            <Controller
              defaultValue={resource?.content.port}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <InputNumber
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  w="142px"
                  ml="8px"
                  placeholder={getResourceDefaultPort(resourceType)}
                />
              )}
              name="port"
            />
          </div>
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.database")}
            </span>
          </div>
          <Controller
            defaultValue={resource?.content.databaseName}
            control={control}
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
                  "editor.action.resource.db.placeholder.database",
                )}
              />
            )}
            name="databaseName"
          />
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.username_password")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              defaultValue={resource?.content.databaseUsername}
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  colorScheme="techPurple"
                  placeholder={t(
                    "editor.action.resource.db.placeholder.username",
                  )}
                />
              )}
              name="databaseUsername"
            />
            <Controller
              control={control}
              defaultValue={resource?.content.databasePassword}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Password
                  colorScheme="techPurple"
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  ml="8px"
                  placeholder={t(
                    "editor.action.resource.db.placeholder.password",
                  )}
                />
              )}
              name="databasePassword"
            />
          </div>
        </div>
        {isCloudVersion && (
          <>
            <div css={configItemTip}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={connectType}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(getColor("grayBlue", "02"))}
                >
                  {t("editor.action.resource.db.label.connect_type")}
                </span>
              </div>
              <span css={connectTypeStyle}>
                {t("editor.action.resource.db.tip.connect_type")}
              </span>
            </div>
          </>
        )}
        <Divider
          direction="horizontal"
          ml="24px"
          mr="24px"
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>

        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={resource?.content.ssl.ssl}
          name="ssl"
          onValueChange={handleSwitchValueChange}
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />

        {sslOpen && (
          <>
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.ca_certificate")}
              isRequired
              rules={[
                {
                  required: true,
                },
              ]}
              control={control}
              defaultValue={resource?.content.ssl.serverCert}
              name="serverCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />

            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={resource?.content.ssl.clientKey}
              name="clientKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />

            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_certificate")}
              control={control}
              defaultValue={resource?.content.ssl.clientCert}
              name="clientCert"
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
              BuilderApi.teamRequest<Resource<MysqlLikeResource>>(
                {
                  method: "POST",
                  url: `/resources/testConnection`,
                  data: {
                    resourceId: data.resourceId,
                    resourceName: data.resourceName,
                    resourceType,
                    content: {
                      host: data.host,
                      port: data.port.toString(),
                      databaseName: data.databaseName,
                      databaseUsername: data.databaseUsername,
                      databasePassword: data.databasePassword,
                      ssl: generateSSLConfig(sslOpen, data),
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

MysqlLikeConfigElement.displayName = "MysqlConfigElement"
