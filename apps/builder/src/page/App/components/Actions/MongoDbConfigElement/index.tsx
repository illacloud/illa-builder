import { FC, useState } from "react"
import { MongoDbConfigElementProps } from "./interface"
import {
  applyConfigItemLabelText,
  configItem,
  configItemTip,
  container,
  divider,
  footerStyle,
  labelContainer,
  optionLabelStyle,
  sslItem,
} from "./style"
import { Input, TextArea } from "@illa-design/input"
import { getColor } from "@illa-design/theme"
import { useTranslation } from "react-i18next"
import { Divider } from "@illa-design/divider"
import { Controller, useForm } from "react-hook-form"
import { Button, ButtonGroup } from "@illa-design/button"
import { PaginationPreIcon } from "@illa-design/icon"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "@/store"
import { generateSSLConfig, Resource } from "@/redux/resource/resourceState"
import { Api } from "@/api/base"
import { Message } from "@illa-design/message"
import {
  MongoDbConfig,
  MongoDbResource,
  MongoDbResourceInitial,
} from "@/redux/resource/mongodbResource"
import { MongoDbGuiMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbGuiMode"
import { MongoDbUriMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbUriMode"
import { sslStyle } from "../MysqlLikeConfigElement/style"
import { Switch } from "@illa-design/switch"
import { RadioGroup } from "@illa-design/radio"

export const MongoDbConfigElement: FC<MongoDbConfigElementProps> = (props) => {
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

  return (
    <form onSubmit={handleSubmit((data, event) => {})}>
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
        <div css={configItem}>
          <div css={labelContainer}>
            <span css={applyConfigItemLabelText(getColor("grayBlue", "02"))}>
              {t("editor.action.resource.db.label.ssl_options")}
            </span>
          </div>
          <Controller
            control={control}
            defaultValue={content.ssl.open}
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
            name="open"
          />
          <span css={sslStyle}>
            {t("editor.action.resource.db.tip.ssl_options")}
          </span>
        </div>
        {sslOpen && (
          <>
            <div css={sslItem}>
              <div css={labelContainer}>
                <span
                  css={applyConfigItemLabelText(
                    getColor("grayBlue", "02"),
                    true,
                  )}
                >
                  {t("editor.action.resource.db.label.mongodb_ssl_client")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={content.ssl.client}
                render={({ field: { value, onChange, onBlur } }) => (
                  <TextArea
                    ml="16px"
                    mr="24px"
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    autoSize
                    placeholder={t(
                      "editor.action.resource.db.placeholder.mongo_certificate",
                    )}
                  />
                )}
                name="client"
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
                  {t("editor.action.resource.db.label.mongodb_ssl_ca")}
                </span>
              </div>
              <Controller
                control={control}
                defaultValue={content.ssl.ca}
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
                name="ca"
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
              Api.request<Resource<MongoDbResource<MongoDbConfig>>>(
                {
                  method: "POST",
                  url: `/resources/testConnection`,
                  data: {
                    resourceId: data.resourceId,
                    resourceName: data.resourceName,
                    resourceType: "mongodb",
                    content: {
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

MongoDbConfigElement.displayName = "MongoDbConfigElement"
