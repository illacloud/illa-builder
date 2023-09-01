import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { FC, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, ButtonGroup, Divider, PreviousIcon } from "@illa-design/react"
import { MongoDbGuiMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbGuiMode"
import { MongoDbUriMode } from "@/page/App/components/Actions/MongoDbConfigElement/MongoDbUriMode"
import {
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
import {
  MongoDbConfig,
  MongoDbResource,
  MongoDbResourceInitial,
  MongoDbSSL,
} from "@/redux/resource/mongodbResource"
import { RootState } from "@/store"
import { validate } from "@/utils/form"

export const MongoDbConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props

  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: MongoDbResource<MongoDbConfig>
  if (findResource === undefined) {
    content = MongoDbResourceInitial
  } else {
    content = findResource.content as MongoDbResource<MongoDbConfig>
  }

  const configTypeWatch = watch("configType", content.configType)
  const openSSLWatch = watch("open", content.ssl.open ?? false)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "mongodb",
    })
    const data = getValues()
    const content = {
      configType: data.configType,
      ssl: {
        open: openSSLWatch,
        client: data.client,
        ca: data.ca,
      } as MongoDbSSL,
      configContent:
        configTypeWatch === "gui"
          ? {
              host: data.host.trim(),
              port:
                data.connectionFormat === "standard"
                  ? data.port.toString()
                  : "",
              connectionFormat: data.connectionFormat,
              databaseName: data.databaseName,
              databaseUsername: data.databaseUsername,
              databasePassword: data.databasePassword,
            }
          : { uri: data.uri.trim() },
    }

    onActionConfigElementTest(data, content, "mongodb", setTestLoading)
  }, [configTypeWatch, getValues, openSSLWatch, track])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "mongodb",
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
          defaultValue={findResource?.resourceName ?? ""}
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
          mt="8px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.general_option")}
        </div>
        <ControlledElement
          title={t("editor.action.resource.db.label.config_type")}
          defaultValue={content.configType}
          name="configType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth
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
        {configTypeWatch === "gui" && (
          <MongoDbGuiMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}
        {configTypeWatch === "uri" && (
          <MongoDbUriMode
            control={control}
            watch={watch}
            resourceID={resourceID}
          />
        )}

        <ControlledElement
          controlledType={["switch"]}
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl.open}
          name="open"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
        />

        {openSSLWatch && (
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
