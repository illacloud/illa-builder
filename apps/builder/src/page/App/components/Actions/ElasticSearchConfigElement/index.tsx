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
} from "./style"
import { Input, Password } from "@illa-design/input"
import { getColor } from "@illa-design/theme"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/divider"
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
  ElasticSearchResource,
  ElasticSearchResourceInitial,
} from "@/redux/resource/elasticSearchResource"
import { isURL } from "@/utils/typeHelper"

export const ElasticSearchConfigElement: FC<RedisConfigElementProps> = (
  props,
) => {
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

  let content: ElasticSearchResource

  if (findResource === undefined) {
    content = ElasticSearchResourceInitial
  } else {
    content = (findResource as Resource<ElasticSearchResource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  return (
    <form
      onSubmit={handleSubmit((data, event) => {
        if (resourceId != undefined) {
          Api.request<Resource<ElasticSearchResource>>(
            {
              method: "PUT",
              url: `/resources/${resourceId}`,
              data: {
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                resourceType: "elasticsearch",
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
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
          Api.request<Resource<ElasticSearchResource>>(
            {
              method: "POST",
              url: `/resources`,
              data: {
                resourceName: data.resourceName,
                resourceType: "elasticsearch",
                content: {
                  host: data.host,
                  port: data.port.toString(),
                  databaseUsername: data.databaseUsername,
                  databasePassword: data.databasePassword,
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
              {t("editor.action.resource.db.label.hosturl")}
            </span>
          </div>
          <div css={hostInputContainer}>
            <Controller
              defaultValue={content.host}
              control={control}
              rules={{
                required: true,
                validate: (value: string) => {
                  return isURL(value)
                    ? true
                    : t("editor.action.resource.error.url_invalid")
                },
              }}
              render={({ field: { value, onChange, onBlur } }) => (
                <Input
                  w="100%"
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  borderColor="techPurple"
                  placeholder={t(
                    "editor.action.resource.db.placeholder.hosturl",
                  )}
                />
              )}
              name="host"
            />
          </div>
        </div>
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("red", "02"))}>*</span>
            <span
              css={applyConfigItemLabelText(getColor("grayBlue", "02"), true)}
            >
              {t("editor.action.resource.db.label.port")}
            </span>
          </div>
          <div css={hostInputContainer}>
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
                  w="100%"
                  placeholder="9200"
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
              Api.request<Resource<ElasticSearchResource>>(
                {
                  method: "POST",
                  url: `/resources/testConnection`,
                  data: {
                    resourceId: data.resourceId,
                    resourceName: data.resourceName,
                    resourceType: "elasticsearch",
                    content: {
                      host: data.host,
                      port: data.port.toString(),
                      databaseUsername: data.databaseUsername,
                      databasePassword: data.databasePassword,
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

ElasticSearchConfigElement.displayName = "ElasticSearchConfigElement"
