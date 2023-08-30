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
  onActionConfigElementSubmit,
  onActionConfigElementTest,
} from "@/page/App/components/Actions/api"
import { ConfigElementProps } from "@/page/App/components/Actions/interface"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  container,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { TextLink } from "@/page/User/components/TextLink"
import {
  ConnectTypeOptions,
  OracleResource,
  OracleResourceInitial,
} from "@/redux/resource/oracleResource"
import { RootState } from "@/store"
import { isContainLocalPath, urlValidate, validate } from "@/utils/form"

export const OracleDBConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceID, onBack, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const { track } = useContext(MixpanelTrackContext)

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [showAlert, setShowAlert] = useState<boolean>(false)

  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })
  const content = (resource?.content as OracleResource) ?? OracleResourceInitial

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "oracle",
    })
    const data = getValues()
    const { resourceName: _resourceName, host, ...otherParams } = data
    onActionConfigElementTest(
      data,
      { ...otherParams, host: host.trim() } as OracleResource,
      "oracle",
      setTestLoading,
    )
  }, [track, getValues])

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleHostValidate = useCallback((value: string) => {
    setShowAlert(isContainLocalPath(value))
    return urlValidate(value)
  }, [])

  return (
    <form
      autoComplete="off"
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "oracle",
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
          title={t("editor.action.resource.db.label.hostname")}
          defaultValue={content.host}
          isRequired
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: handleHostValidate,
            },
          ]}
          name="host"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.resource.db.placeholder.hostname")]}
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
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="port"
          controlledType="input"
          control={control}
          placeholders={["1521"]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.database")}
          defaultValue={content.name}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="name"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.resource.db.placeholder.default")]}
        />

        <ControlledElement
          title={t("editor.action.form.label.oracle.sid")}
          defaultValue={content.connectionType}
          isRequired
          rules={[
            {
              validate,
            },
          ]}
          name="connectionType"
          controlledType="radio-group"
          control={control}
          forceEqualWidth={true}
          options={ConnectTypeOptions}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username")}
          defaultValue={content.username}
          name="username"
          controlledType="input"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.username")]}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.password")}
          defaultValue={content.password}
          name="password"
          controlledType="password"
          control={control}
          placeholders={[t("editor.action.form.placeholder.oracle.password")]}
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
          title={t("editor.action.form.label.oracle.ssl")}
          defaultValue={content.ssl}
          isRequired
          name="ssl"
          controlledType="switch"
          control={control}
          contentLabel={t("editor.action.form.option.oracle.ssl")}
        />
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
OracleDBConfigElement.displayName = "OracleDBConfigElement"
