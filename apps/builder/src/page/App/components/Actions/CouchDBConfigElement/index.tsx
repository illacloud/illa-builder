import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useState } from "react"
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
import {
  CouchdbResource,
  CouchdbResourceInitial,
} from "@/redux/resource/couchdbResource"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"

export const CouchDBConfigElement: FC<ConfigElementProps> = (props) => {
  const { resourceID, onFinished, onBack } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = resource
    ? (resource.content as CouchdbResource)
    : CouchdbResourceInitial

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const handleResourceTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "couchdb",
    })
    const data = getValues()
    const { resourceName: _resourceName, ...otherParams } = data
    onActionConfigElementTest(
      data,
      otherParams as CouchdbResource,
      "couchdb",
      setTestLoading,
    )
  }, [getValues, track])

  return (
    <form
      autoComplete="off"
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "couchdb",
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
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.hostname")}
          control={control}
          defaultValue={content.host}
          rules={[
            {
              required: t("editor.action.resource.error.invalid_url"),
              validate: urlValidate,
            },
          ]}
          name="host"
          tips={
            formState.errors.host && (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            )
          }
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.port")}
          control={control}
          defaultValue={content.port}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[t("editor.action.form.placeholder.couchdb.port.5984")]}
          name="port"
        />
        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.username")}
          control={control}
          defaultValue={content.username}
          rules={[
            {
              validate,
            },
          ]}
          name="username"
        />
        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.resource.db.label.password")}
          control={control}
          defaultValue={content.password}
          rules={[
            {
              validate,
            },
          ]}
          name="password"
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
          mt="16px"
          mb="8px"
          w="unset"
        />
        <div css={optionLabelStyle}>
          {t("editor.action.resource.db.title.advanced_option")}
        </div>
        <ControlledElement
          controlledType="switch"
          title={t("editor.action.form.label.couchdb.ssl")}
          control={control}
          defaultValue={content.ssl}
          name="ssl"
          contentLabel={t("editor.action.form.option.couchdb.ssl")}
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
            onClick={handleResourceTest}
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

CouchDBConfigElement.displayName = "CouchDBConfigElement"
