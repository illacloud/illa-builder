import { FC, useState } from "react"
import { MysqlLikeConfigElementProps } from "./interface"
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
import { generateSSLConfig, Resource } from "@/redux/resource/resourceState"
import { Api } from "@/api/base"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import { useMessage } from "@illa-design/message"

/**
 * include mariadb or tidb
 * @param props
 * @constructor
 */
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

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          Api.request<Resource<MysqlLikeResource>>(
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
          Api.request<Resource<MysqlLikeResource>>(
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
                  borderColor="techPurple"
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
                borderColor="techPurple"
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
                  borderColor="techPurple"
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
                  borderColor="techPurple"
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
        <div css={configItemTip}>
          {t("editor.action.resource.db.tip.username_password")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.db.label.connect_type")}
            </span>
          </div>
          <span css={connectTypeStyle}>
            {t("editor.action.resource.db.tip.connect_type")}
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
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.db.label.ssl_options")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={resource?.content.ssl.ssl}
            render={({ field: { value, onChange, onBlur } }) => (
              <Switch
                checked={value}
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
            {t("editor.action.resource.db.tip.ssl_options")}
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
                  {t("editor.action.resource.db.label.ca_certificate")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={resource?.content.ssl.serverCert}
                rules={{
                  required: true,
                }}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoSize
                    placeholder={t(
                      "editor.action.resource.db.placeholder.certificate",
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
                  {t("editor.action.resource.db.label.client_key")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={resource?.content.ssl.clientKey}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    autoSize
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholder={t(
                      "editor.action.resource.db.placeholder.certificate",
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
                  {t("editor.action.resource.db.label.client_certificate")}
                </span>
              </div>
              <Controller
                control={control}
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
                      "editor.action.resource.db.placeholder.certificate",
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
              Api.request<Resource<MysqlLikeResource>>(
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
