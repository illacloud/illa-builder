import { TextLink } from "@illa-public/text-link"
import { isCloudVersion } from "@illa-public/utils"
import { FC, useCallback, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"
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
import {
  RedisResource,
  RedisResourceInitial,
} from "@/redux/resource/redisResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { isContainLocalPath, validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { RedisLikeConfigElementProps } from "./interface"

const RedisConfigElement: FC<RedisLikeConfigElementProps> = (props) => {
  const { onBack, resourceID, resourceType, hasFooter = true } = props
  const { t } = useTranslation()
  const { control } = useFormContext()
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

  const userNameOrPassword = useMemo(() => {
    if (resourceType === "redis") {
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
  }, [content.databasePassword, content.databaseUsername, resourceType, t])

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

  return (
    <>
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
        {resourceType === "redis" && (
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
      {hasFooter && (
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
            <TestConnectButton resourceType={resourceType} />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

RedisConfigElement.displayName = "RedisConfigElement"
export default RedisConfigElement
