import { FC, useState } from "react"
import { MysqlConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  connectTypeStyle,
  container,
  divider,
  footerStyle,
  hostInputContainer,
  labelContainer,
  optionLabelStyle,
  sslItem,
  sslStyle,
} from "./style"
import { Input, Password, TextArea } from "@illa-design/input"
import { getColor } from "@illa-design/theme"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/divider"
import { Switch } from "@illa-design/switch"
import { InputNumber } from "@illa-design/input-number"
import { Controller, useForm } from "react-hook-form"
import { Button, ButtonGroup } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import {
  MysqlResource,
  MysqlSSL,
  Resource,
  RestApiAuth,
  RestApiResource,
} from "@/redux/resource/resourceState"
import { Api } from "@/api/base"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Message } from "@illa-design/message"

export function generateSSLConfig(
  open: boolean,
  data: { [p: string]: any },
): MysqlSSL {
  return {
    ssl: open,
    clientKey: data.clientKey,
    clientCert: data.clientCert,
    serverCert: data.serverCert,
  } as MysqlSSL
}

export const MysqlConfigElement: FC<MysqlConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === resourceId,
    ) as Resource<MysqlResource>
  })

  const [sslOpen, setSSLOpen] = useState(resource?.content.ssl.ssl ?? false)

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          Api.request<Resource<MysqlResource>>(
            {
              method: "PUT",
              url: `/resources/${resourceId}`,
              data: {
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                resourceType: "mysql",
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
              onFinished(response.data.resourceId)
              dispatch(resourceActions.updateResourceItemReducer(response.data))
              Message.success(t("dashboard.resource.save_success"))
            },
            (error) => {
              Message.error(error.data.errorMessage)
            },
            () => {
              Message.error(t("dashboard.resource.save_fail"))
            },
            (loading) => {
              setSaving(loading)
            },
          )
        } else {
          Api.request<Resource<RestApiResource<RestApiAuth>>>(
            {
              method: "POST",
              url: `/resources`,
              data: {
                resourceName: data.resourceName,
                resourceType: "mysql",
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
              onFinished(response.data.resourceId)
              dispatch(resourceActions.addResourceItemReducer(response.data))
              Message.success(t("dashboard.resource.save_success"))
            },
            (error) => {
              Message.error(error.data.errorMessage)
            },
            () => {
              Message.error(t("dashboard.resource.save_fail"))
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
              {t("editor.action.resource.mysql.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.resourceName ?? ""}
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
                borderColor="techPurple"
                placeholder={t("editor.action.resource.mysql.placeholder.name")}
              />
            )}
            name="resourceName"
          />
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.mysql.label.hostname_port")}
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
                  borderColor="techPurple"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.hostname",
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
                  borderColor="techPurple"
                  w="142px"
                  ml="8px"
                  placeholder="3306"
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
              {t("editor.action.resource.mysql.label.database")}
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
                borderColor="techPurple"
                placeholder={t(
                  "editor.action.resource.mysql.placeholder.database",
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
              {t("editor.action.resource.mysql.label.username_password")}
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
                  borderColor="techPurple"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.username",
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
                  borderColor="techPurple"
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  ml="8px"
                  placeholder={t(
                    "editor.action.resource.mysql.placeholder.password",
                  )}
                />
              )}
              name="databasePassword"
            />
          </div>
        </div>
        <span css={configItemTip}>
          {t("editor.action.resource.mysql.tip.username_password")}
        </span>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.mysql.label.connect_type")}
            </span>
          </div>
          <span css={connectTypeStyle}>
            {t("editor.action.resource.mysql.tip.connect_type")}
          </span>
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
          {t("editor.action.resource.mysql.title.advanced_option")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.mysql.label.ssl_options")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.content.ssl.ssl}
            render={({ field: { value, onChange, onBlur } }) => (
              <Switch
                value={value}
                ml="16px"
                colorScheme="techPurple"
                onChange={(open) => {
                  onChange(open)
                  setSSLOpen(open)
                }}
                onBlur={onBlur}
              />
            )}
            name="ssl"
          />
          <span css={sslStyle}>
            {t("editor.action.resource.mysql.tip.ssl_options")}
          </span>
        </div>
        {sslOpen && (
          <>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span css={applyConfigItemLabelText(getColor("red", "02"))}>
                  *
                </span>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.ca_certificate")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={resource?.content.ssl.serverCert}
                rules={{
                  required: true,
                }}
                shouldUnregister={true}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoSize
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="serverCert"
              />
            </div>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.client_key")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={resource?.content.ssl.clientKey}
                shouldUnregister={true}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    autoSize
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="clientKey"
              />
            </div>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.mysql.label.client_certificate")}
                </span>
              </div>
              <Controller
                control={control}
                shouldUnregister={true}
                defaultValue={resource?.content.ssl.clientCert}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    autoSize
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={t(
                      "editor.action.resource.mysql.placeholder.certificate",
                    )}
                  />
                )}
                name="clientCert"
              />
            </div>
          </>
        )}
      </div>
      <div css={footerStyle}>
        <Button
          leftIcon={<PaginationPreIcon />}
          variant="text"
          colorScheme="gray"
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
              Api.request<Resource<MysqlResource>>(
                {
                  method: "POST",
                  url: `/resources/testConnection`,
                  data: {
                    resourceId: data.resourceId,
                    resourceName: data.resourceName,
                    resourceType: "mysql",
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
                  Message.success(t("dashboard.resource.test_success"))
                },
                (error) => {
                  Message.error(error.data.errorMessage)
                },
                () => {
                  Message.error(t("dashboard.resource.test_fail"))
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

MysqlConfigElement.displayName = "MysqlConfigElement"
