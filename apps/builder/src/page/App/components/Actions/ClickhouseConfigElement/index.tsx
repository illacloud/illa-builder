import { FC, useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  Divider,
  PreviousIcon,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import {
  applyConfigItemLabelText,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
} from "@/page/App/components/Actions/ClickhouseConfigElement/style"
import {
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import {
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { ClickhouseResource } from "@/redux/resource/clickhouseResource"
import {
  ClickhouseSSL,
  Resource,
  generateSSLConfig,
} from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isCloudVersion, isURL } from "@/utils/typeHelper"
import { ClickhouseConfigElementProps } from "./interface"

export const ClickhouseConfigElement: FC<ClickhouseConfigElementProps> = (
  props,
) => {
  const { onBack, resourceId, onFinished } = props

  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceId === resourceId,
    ) as Resource<ClickhouseResource>
  })

  const [sslOpen, setSSLOpen] = useState(resource?.content.ssl.ssl ?? false)
  const [selfSigned, setSelfSigned] = useState(
    resource?.content.ssl.selfSigned ?? false,
  )

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = useCallback(() => {
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host,
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(sslOpen, data, "clickhouse") as ClickhouseSSL,
      },
      "clickhouse",
      setTestLoading,
    )
  }, [setTestLoading, getValues, sslOpen])

  const handleURLValidate = useCallback(
    (value: string) => {
      return isURL(value) ? true : t("editor.action.resource.error.invalid_url")
    },
    [t],
  )

  const handleSwitchValueChange = useCallback((open: boolean | string) => {
    setSSLOpen(!!open)
    if (!open) {
      setSelfSigned(!!open)
    }
  }, [])

  const handleSelfSignedValueChange = useCallback((open: boolean | string) => {
    setSelfSigned(!!open)
  }, [])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "clickhouse",
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
              validate: (value) => value != undefined && value.trim() != "",
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
          controlledType={["input", "number"]}
          isRequired
          title={t("editor.action.resource.db.label.hostname_port")}
          control={control}
          defaultValue={[
            resource?.content.host,
            String(resource?.content.port || ""),
          ]}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleURLValidate,
            },
            {
              required: true,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            "9440",
          ]}
          name={["host", "port"]}
          styles={[
            {},
            {
              w: "142px",
              ml: "8px",
            },
          ]}
          tips={
            formState.errors.host ? (
              <div css={errorMsgStyle}>
                <>
                  <WarningCircleIcon css={errorIconStyle} />
                  {formState.errors.host.message}
                </>
              </div>
            ) : null
          }
        />
        <ControlledElement
          controlledType={["input"]}
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={resource?.content.databaseName}
          rules={[
            {
              required: true,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
          name="databaseName"
        />

        <ControlledElement
          controlledType={["input", "password"]}
          title={t("editor.action.resource.db.label.username_password")}
          control={control}
          defaultValue={[
            resource?.content.username,
            resource?.content.password,
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.username"),
            t("editor.action.resource.db.placeholder.password"),
          ]}
          name={["username", "password"]}
          styles={[
            {},
            {
              ml: "8px",
            },
          ]}
        />

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
          <ControlledElement
            controlledType={["switch"]}
            title={""}
            control={control}
            defaultValue={resource?.content.ssl.selfSigned}
            name="selfSigned"
            onValueChange={handleSelfSignedValueChange}
            contentLabel={t(
              "editor.action.resource.db.label.self_signed_certificate",
            )}
          />
        )}
        {selfSigned && (
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
              defaultValue={resource?.content.ssl.caCert}
              name="caCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={resource?.content.ssl.privateKey}
              name="privateKey"
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

ClickhouseConfigElement.displayName = "ClickhouseConfigElement"
