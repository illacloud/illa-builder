import { FC, useCallback, useState } from "react"
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
  filterWhitespace,
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
import { TextLink } from "@/page/User/components/TextLink"
import {
  RedisResource,
  RedisResourceInitial,
} from "@/redux/resource/redisResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, validate } from "@/utils/form"
import { isCloudVersion } from "@/utils/typeHelper"

export const RedisConfigElement: FC<ConfigElementProps> = (props) => {
  const { onBack, resourceId, onFinished } = props
  const { t } = useTranslation()
  const { control, handleSubmit, getValues, formState, watch } = useForm({
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

  const [showAlert, setShowAlert] = useState<boolean>(false)
  const [testLoading, setTestLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const sslOpenWatch = watch("ssl", content.ssl ?? false)

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

  const handleDocLinkClick = () => {
    window.open("https://www.illacloud.com/docs/illa-cli", "_blank")
  }

  const handleConnectionTest = useCallback(() => {
    const data = getValues()
    onActionConfigElementTest(
      data,
      {
        host: filterWhitespace(data.host),
        port: data.port.toString(),
        databaseIndex: data.databaseIndex ?? 0,
        databaseUsername: data.databaseUsername,
        databasePassword: data.databasePassword,
        ssl: sslOpenWatch,
      },
      "redis",
      setTestLoading,
    )
  }, [getValues, sslOpenWatch])

  return (
    <form
      onSubmit={onActionConfigElementSubmit(
        handleSubmit,
        resourceId,
        "redis",
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
          title={t("editor.action.resource.db.label.database_index")}
          defaultValue={content.databaseIndex}
          name="databaseIndex"
          placeholders={[
            t("editor.action.resource.db.placeholder.database_index"),
          ]}
          controlledType="input"
          control={control}
        />
        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          controlledType={["input", "password"]}
          control={control}
          defaultValue={[content.databaseUsername, content.databasePassword]}
          name={["databaseUsername", "databasePassword"]}
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
