import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Alert,
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
import { TextLink } from "@/page/User/components/TextLink"
import {
  ClickhouseResource,
  ClickhouseResourceInitial,
  ClickhouseSSL,
} from "@/redux/resource/clickhouseResource"
import { Resource, generateSSLConfig } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, urlValidate, validate } from "@/utils/form"
import { ClickhouseConfigElementProps } from "./interface"

export const ClickhouseConfigElement: FC<ClickhouseConfigElementProps> = (
  props,
) => {
  const { onBack, resourceID, onFinished } = props

  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })

  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<ClickhouseResource>
  })

  const content = resource?.content ?? ClickhouseResourceInitial

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const sslOpen = watch("ssl", content.ssl.ssl)
  const selfSigned = sslOpen && watch("selfSigned", content.ssl.selfSigned)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "clickhouse",
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host.trim(),
        port: +data.port,
        username: data.username,
        password: data.password,
        databaseName: data.databaseName,
        ssl: generateSSLConfig(sslOpen, data, "clickhouse") as ClickhouseSSL,
      },
      "clickhouse",
      setTestLoading,
    )
  }, [track, getValues, sslOpen])

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? "")
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert)
      }
      return urlValidate(value)
    },
    [showAlert],
  )

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
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
          controlledType={["input", "number"]}
          isRequired
          title={t("editor.action.resource.db.label.hostname_port")}
          control={control}
          defaultValue={[content.host, content.port]}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleHostValidate,
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
            formState.errors.host && !showAlert ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
        />
        {showAlert && (
          <ControlledElement
            defaultValue=""
            name=""
            title=""
            controlledType="none"
            control={control}
            tips={
              <Alert
                title={t("editor.action.form.tips.connect_to_local.title.tips")}
                closable={false}
                content={
                  isCloudVersion ? (
                    <Trans
                      i18nKey="editor.action.form.tips.connect_to_local.cloud"
                      t={t}
                      components={[
                        <TextLink
                          key="editor.action.form.tips.connect_to_local.cloud"
                          onClick={handleDocLinkClick}
                        />,
                      ]}
                    />
                  ) : (
                    t("editor.action.form.tips.connect_to_local.selfhost")
                  )
                }
              />
            }
          />
        )}
        <ControlledElement
          controlledType={["input"]}
          isRequired
          title={t("editor.action.resource.db.label.database")}
          control={control}
          defaultValue={content.databaseName}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
          name="databaseName"
        />

        <ControlledElement
          controlledType={["input", "password"]}
          title={t("editor.action.resource.db.label.username_password")}
          control={control}
          defaultValue={[content.username, content.password]}
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
          defaultValue={content.ssl.ssl}
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
          tips={t("editor.action.form.tips.clickhouse.ssl")}
        />

        {sslOpen && (
          <ControlledElement
            controlledType={["switch"]}
            title={""}
            control={control}
            defaultValue={content.ssl.selfSigned}
            name="selfSigned"
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
                  validate,
                },
              ]}
              control={control}
              defaultValue={content.ssl.caCert}
              name="caCert"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_key")}
              control={control}
              defaultValue={content.ssl.privateKey}
              name="privateKey"
              placeholders={[
                t("editor.action.resource.db.placeholder.certificate"),
              ]}
            />
            <ControlledElement
              controlledType={["textarea"]}
              title={t("editor.action.resource.db.label.client_certificate")}
              control={control}
              defaultValue={content.ssl.clientCert}
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
