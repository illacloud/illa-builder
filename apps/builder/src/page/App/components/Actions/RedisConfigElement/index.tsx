import {
  ILLA_MIXPANEL_EVENT_TYPE,
  MixpanelTrackContext,
} from "@illa-public/mixpanel-utils"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useForm } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Alert,
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
import { RedisLikeConfigElementProps } from "@/page/App/components/Actions/interface"
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
import { ControlledType } from "@/page/App/components/ControlledElement/interface"
import { TextLink } from "@/page/User/components/TextLink"
import {
  RedisResource,
  RedisResourceInitial,
} from "@/redux/resource/redisResource"
import { Resource } from "@/redux/resource/resourceState"
import { DATABASE_INDEX, DEFAULT_NAME } from "@/redux/resource/upstashResource"
import { RootState } from "@/store"
import { isContainLocalPath, validate } from "@/utils/form"

export const RedisConfigElement: FC<RedisLikeConfigElementProps> = (props) => {
  const { onBack, resourceID, onFinished, type } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  })
  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: RedisResource
  if (findResource === undefined) {
    content = RedisResourceInitial
  } else {
    content = (findResource as Resource<RedisResource>).content
  }

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const { track } = useContext(MixpanelTrackContext)

  const sslOpenWatch = watch("ssl", content.ssl ?? false)
  const userNameOrPassword = useMemo(() => {
    if (type === "redis") {
      return {
        title: t("editor.action.resource.db.label.username_password"),
        controlledType: ["input", "password"] as ControlledType[],
        name: ["databaseUsername", "databasePassword"],
        defaultValue: [content.databaseUsername, content.databasePassword],
        placeholders: [
          t("editor.action.resource.db.placeholder.username"),
          t("editor.action.resource.db.placeholder.password"),
        ],
      }
    } else {
      return {
        title: t("editor.action.resource.db.label.password"),
        controlledType: "password" as ControlledType,
        name: "databasePassword",
        defaultValue: content.databasePassword,
        placeholders: [t("editor.action.resource.db.placeholder.password")],
      }
    }
  }, [content.databasePassword, content.databaseUsername, t, type])

  const handleHostValidate = useCallback(
    (value: string) => {
      const isShowAlert = isContainLocalPath(value ?? "")
      if (isShowAlert !== showAlert) {
        setShowAlert(isShowAlert)
      }
      return true
    },
    [showAlert],
  )

  const handleConnectionTest = useCallback(() => {
    track?.(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
      element: "resource_configure_test",
      parameter5: type,
    })
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: data.host.trim(),
        port: data.port.toString(),
        databaseIndex: DATABASE_INDEX,
        databaseUsername: DEFAULT_NAME,
        databasePassword: data.databasePassword,
        ssl: sslOpenWatch,
      },
      type,
      setTestLoading,
    )
  }, [getValues, sslOpenWatch, track, type])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceID,
        type,
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
          defaultValue={[content.host, content.port]}
          title={t("editor.action.resource.db.label.hostname_port")}
          control={control}
          rules={[
            {
              required: true,
              validate: handleHostValidate,
            },
            {
              required: true,
            },
          ]}
          isRequired
          controlledType={["input", "number"]}
          name={["host", "port"]}
          placeholders={[
            t("editor.action.resource.db.placeholder.hostname"),
            "6379",
          ]}
          styles={[
            {
              flex: 4,
            },
            {
              flex: 1,
            },
          ]}
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
                          onClick={() => {
                            window.open(
                              "https://www.illacloud.com/docs/illa-cli",
                              "_blank",
                            )
                          }}
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
        {type === "redis" && (
          <ControlledElement
            title={t("editor.action.resource.db.label.database_index")}
            defaultValue={content.databaseIndex}
            name="databaseIndex"
            placeholders={[
              t("editor.action.resource.db.placeholder.database_index"),
            ]}
            controlledType="number"
            control={control}
          />
        )}
        <ControlledElement
          title={userNameOrPassword.title}
          controlledType={userNameOrPassword.controlledType}
          control={control}
          defaultValue={userNameOrPassword.defaultValue}
          name={userNameOrPassword.name}
          placeholders={userNameOrPassword.placeholders}
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
          title={t("editor.action.resource.db.label.ssl_options")}
          control={control}
          defaultValue={content.ssl}
          controlledType="switch"
          name="ssl"
          contentLabel={t("editor.action.resource.db.tip.ssl_options")}
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

RedisConfigElement.displayName = "RedisConfigElement"
