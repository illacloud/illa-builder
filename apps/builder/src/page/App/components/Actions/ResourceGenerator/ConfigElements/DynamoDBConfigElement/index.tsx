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
  getColor,
} from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  divider,
  footerStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/components/Actions/styles"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import {
  DynamoDBResource,
  DynamoDBResourceInitial,
} from "@/redux/resource/dynamoResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { TestConnectButton } from "../ActionButtons/TestConnectButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const DynamoDBConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID, onBack, hasFooter = true } = props
  const { t } = useTranslation()
  const { control } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  const content = useMemo(() => {
    if (resource === undefined) {
      return DynamoDBResourceInitial
    } else {
      return (resource as Resource<DynamoDBResource>).content
    }
  }, [resource])

  return (
    <>
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
          title={t("editor.action.resource.db.label.dynamo_region")}
          control={control}
          defaultValue={content.region}
          rules={[
            {
              validate,
            },
          ]}
          placeholders={[
            t("editor.action.resource.db.placeholder.dynamo_region"),
          ]}
          name="region"
        />

        <ControlledElement
          controlledType="input"
          isRequired
          title={t("editor.action.resource.db.label.dynamo_access_key_id")}
          control={control}
          defaultValue={content.accessKeyID}
          rules={[
            {
              validate,
            },
          ]}
          name="accessKeyID"
        />

        <ControlledElement
          controlledType="password"
          isRequired
          title={t("editor.action.resource.db.label.dynamo_secret_key")}
          control={control}
          defaultValue={content.secretAccessKey}
          rules={[
            {
              validate,
            },
          ]}
          name="secretAccessKey"
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
            <TestConnectButton resourceType="dynamodb" />
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}
DynamoDBConfigElement.displayName = "DynamoDBConfigElement"
export default DynamoDBConfigElement
