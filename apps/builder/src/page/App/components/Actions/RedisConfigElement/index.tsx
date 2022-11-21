import { FC, useState } from "react"
import { RedisConfigElementProps } from "./interface"
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
  sslStyle,
} from "./style"
import { Input, Password } from "@illa-design/input"
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
import { Resource } from "@/redux/resource/resourceState"
import { Api } from "@/api/base"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Message } from "@illa-design/message"
import {
  RedisResource,
  RedisResourceInitial,
} from "@/redux/resource/redisResource"
import { isCloudVersion } from "@/utils/typeHelper"

export const RedisConfigElement: FC<RedisConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()

  const dispatch = useDispatch()

  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceId === resourceId)
  })

  let content: RedisResource

  if (findResource === undefined) {
    content = RedisResourceInitial
  } else {
    content = (findResource as Resource<RedisResource>).content
  }

  const [sslOpen, setSSLOpen] = useState(content.ssl ?? false)

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          Api.request<Resource<RedisResource>>(
            {
              method: "PUT",
              url: `/resources/${resourceId}`,
              data: {
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                resourceType: "redis",
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseIndex: data.databaseIndex ?? 0,
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
                  ssl: sslOpen,
                },
              },
            },
            (response) => {
              dispatch(resourceActions.updateResourceItemReducer(response.data))
              Message.success(t("dashboard.resource.save_success"))
              onFinished(response.data.resourceId)
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
          Api.request<Resource<RedisResource>>(
            {
              method: "POST",
              url: `/resources`,
              data: {
                resourceName: data.resourceName,
                resourceType: "redis",
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseIndex: data.databaseIndex ?? 0,
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
                  ssl: sslOpen,
                },
              },
            },
            (response) => {
              dispatch(resourceActions.addResourceItemReducer(response.data))
              Message.success(t("dashboard.resource.save_success"))
              onFinished(response.data.resourceId)
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
              {t("editor.action.resource.db.label.name")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={findResource?.resourceName ?? ""}
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
              defaultValue={content.host}
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
              defaultValue={content.port}
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
                  placeholder="6379"
                />
              )}
              name="port"
            />
          </div>
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.database_index")}
            </span>
          </div>
          <Controller
            defaultValue={content.databaseIndex}
            control={control}
            render={({ field: { value, onChange, onBlur } }) => (
              <InputNumber
                w="100%"
                ml="16px"
                mr="24px"
                onBlur={onBlur}
                onChange={onChange}
                value={value}
                borderColor="techPurple"
                placeholder={t(
                  "editor.action.resource.db.placeholder.database_index",
                )}
              />
            )}
            name="databaseIndex"
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
              defaultValue={content.databaseUsername}
              control={control}
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
              defaultValue={content.databasePassword}
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
        {isCloudVersion && (
          <>
            <div css={configItemTip}>
              {t("editor.action.resource.db.tip.username_password")}
            </div>
            <div css={configItem}>
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
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.db.label.ssl_options")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={content.ssl}
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
              Api.request<Resource<RedisResource>>(
                {
                  method: "POST",
                  url: `/resources/testConnection`,
                  data: {
                    resourceId: data.resourceId,
                    resourceName: data.resourceName,
                    resourceType: "redis",
                    content: {
                      host: data.host,
                      port: data.port.toString(),
                      databaseIndex: data.databaseIndex ?? 0,
                      databaseUsername: data.databaseUsername,
                      databasePassword: data.databasePassword,
                      ssl: sslOpen,
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

RedisConfigElement.displayName = "RedisConfigElement"
