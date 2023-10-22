import { isCloudVersion } from "@illa-public/utils"
import { FC, useMemo } from "react"
import { useFormContext } from "react-hook-form"
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
  configItemTip,
  connectType,
  connectTypeStyle,
  divider,
  errorIconStyle,
  errorMsgStyle,
  footerStyle,
  labelContainer,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  ElasticSearchResource,
  ElasticSearchResourceInitial,
} from "@/redux/resource/elasticSearchResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { urlValidate, validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const ElasticSearchConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { onBack, resourceID, hasFooter = true } = props

  const { t } = useTranslation()

  const { control, formState } = useFormContext()

  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = useMemo(() => {
    if (findResource === undefined) {
      return ElasticSearchResourceInitial
    } else {
      return (findResource as Resource<ElasticSearchResource>).content
    }
  }, [findResource])

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

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.hosturl")}
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
            formState.errors.host ? (
              <div css={errorMsgStyle}>
                <WarningCircleIcon css={errorIconStyle} />
                <>{formState.errors.host.message}</>
              </div>
            ) : null
          }
        />

        <ControlledElement
          isRequired
          title={t("editor.action.resource.db.label.port")}
          defaultValue={content.port}
          name="port"
          controlledType="number"
          control={control}
        />

        <ControlledElement
          title={t("editor.action.resource.db.label.username_password")}
          controlledType={["input", "password"]}
          defaultValue={[content.username, content.password]}
          name={["username", "password"]}
          control={control}
          isRequired
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
            <TestConnectButton resourceType="elasticsearch" />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

ElasticSearchConfigElement.displayName = "ElasticSearchConfigElement"
export default ElasticSearchConfigElement
