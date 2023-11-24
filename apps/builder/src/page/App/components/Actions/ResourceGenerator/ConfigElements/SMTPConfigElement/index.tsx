import { SMTPResourceInitial } from "@illa-public/public-configs"
import { SMTPResource } from "@illa-public/public-types"
import { isCloudVersion } from "@illa-public/utils"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Divider, getColor } from "@illa-design/react"
import {
  applyConfigItemLabelText,
  configItemTip,
  connectType,
  connectTypeStyle,
  labelContainer,
  optionLabelStyle,
} from "@/page/App/Module/ActionEditor/styles"
import { ControlledElement } from "@/page/App/components/Actions/ControlledElement"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const SMTPConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { resourceID } = props
  const { t } = useTranslation()
  const { control } = useFormContext()
  const findResource = useSelector((state: RootState) => {
    return state.resource.find((r) => r.resourceID === resourceID)
  })

  let content: SMTPResource
  if (findResource === undefined) {
    content = SMTPResourceInitial
  } else {
    content = (findResource as Resource<SMTPResource>).content
  }

  return (
    <>
      <div css={container}>
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
    </>
  )
}

SMTPConfigElement.displayName = "SMTPConfigElement"
export default SMTPConfigElement
