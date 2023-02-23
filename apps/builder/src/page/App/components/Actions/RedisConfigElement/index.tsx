import { FC, useState } from "react"
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
import {
  RedisResource,
  RedisResourceInitial,
} from "@/redux/resource/redisResource"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion } from "@/utils/typeHelper"
import { RedisConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  container,
  divider,
  footerStyle,
  hostInputContainer,
  sslStyle,
} from "./style"

export const RedisConfigElement: FC<RedisConfigElementProps> = (props) => {
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
          BuilderApi.teamRequest<Resource<RedisResource>>(
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
          BuilderApi.teamRequest<Resource<RedisResource>>(
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
                  colorScheme="techPurple"
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
                  colorScheme="techPurple"
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
                colorScheme="techPurple"
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
              defaultValue={content.databasePassword}
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
              BuilderApi.teamRequest<Resource<RedisResource>>(
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

RedisConfigElement.displayName = "RedisConfigElement"
