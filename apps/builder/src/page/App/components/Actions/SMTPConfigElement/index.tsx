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
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { Resource } from "@/redux/resource/resourceState"
import {
  SMTPResource,
  SMTPResourceInitial,
} from "@/redux/resource/smtpResource"
import { RootState } from "@/store"
import { validate } from "@/utils/form"

export const SMTPConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })
  const { track } = useContext(MixpanelTrackContext)

  let content: SMTPResource
  if (findResource === undefined) {
    content = SMTPResourceInitial
  } else {
    content = (findResource as Resource<SMTPResource>).content
  }

  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: "smtp",
    })
    const data = getValues()
    const content = {
      host: data.host.trim(),
      port: +data.port,
      username: data.username,
      password: data.password,
    }
    onActionConfigElementTest(data, content, "smtp", setTestLoading)
  }, [getValues, track])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        "smtp",
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
          title={t("editor.action.resource.db.label.hostname_port")}
          defaultValue={[content.host, content.port]}
          name={["host", "port"]}
          controlledType={["input", "number"]}
          control={control}
          isRequired
          rules={[
            {
              validate,
            },
            {
              required: true,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            "25",
          ]}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
          tips={t("editor.action.panel.smtp.tips.port")}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          defaultValue={[content.username, content.password]}
          name={["username", "password"]}
          controlledType={["input", "password"]}
          control={control}
          placeholders={[
            t("editor.action.resource.db.placeholder.username"),
            t("editor.action.resource.db.placeholder.password"),
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

SMTPConfigElement.displayName = "SMTPConfigElement"
