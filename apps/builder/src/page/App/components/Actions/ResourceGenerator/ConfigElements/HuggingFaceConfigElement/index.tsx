import { TextLink } from "@illa-public/text-link"
import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { Trans, useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import {
  Button,
  ButtonGroup,
  FileDefaultIcon,
  PreviousIcon,
} from "@illa-design/react"
import {
  docContainerStyle,
  docItemStyle,
  docsItemContainerStyle,
  footerStyle,
  labelContainer,
  labelStyle,
  tipsStyle,
} from "@/page/App/components/Actions/ResourceGenerator/ConfigElements/HuggingFaceConfigElement/style"
import { ControlledElement } from "@/page/App/components/ControlledElement"
import { HuggingFaceResource } from "@/redux/resource/huggingFaceResource"
import { Resource } from "@/redux/resource/resourceState"
import { RootState } from "@/store"
import { validate } from "@/utils/form"
import { CreateButton } from "../ActionButtons/CreateButton"
import { BaseConfigElementProps } from "../interface"
import { container } from "../style"

const HuggingFaceConfigElement: FC<BaseConfigElementProps> = (props) => {
  const { onBack, resourceID, hasFooter = true } = props
  const { t } = useTranslation()

  const { control } = useFormContext()
  const resource = useSelector((state: RootState) => {
    return state.resource.find(
      (r) => r.resourceID === resourceID,
    ) as Resource<HuggingFaceResource>
  })

  const handleURLClick = (link: string) => window.open(link, "_blank")

  return (
    <>
      <div css={container}>
        <div css={docsItemContainerStyle}>
          <div css={labelContainer} />
          <div css={docContainerStyle}>
            <span css={docItemStyle}>Learn more about Hugging Face:</span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick("https://huggingface.co/inference-api")
              }
            >
              <FileDefaultIcon />
              <span>Inference API</span>
            </span>
            <span
              css={docItemStyle}
              onClick={() =>
                handleURLClick(
                  "https://huggingface.co/docs/api-inference/quicktour",
                )
              }
            >
              <FileDefaultIcon />
              <span>API Doc</span>
            </span>
          </div>
        </div>

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
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
        />

        <ControlledElement
          title={t("editor.action.resource.db.label.bear_token")}
          defaultValue={resource?.content.token ?? ""}
          name="token"
          controlledType="password"
          control={control}
          isRequired
          tips={
            <Trans
              i18nKey="editor.action.resource.db.tip.bear_token"
              t={t}
              components={[
                <TextLink
                  key={"editor.action.resource.db.tip.bear_token"}
                  onClick={() => {
                    handleURLClick("https://huggingface.co/settings/tokens")
                  }}
                />,
              ]}
            />
          }
          labelStyle={labelStyle}
          tipsStyle={tipsStyle}
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
            <CreateButton />
          </ButtonGroup>
        </div>
      )}
    </>
  )
}

HuggingFaceConfigElement.displayName = "HuggingFaceConfigElement"
export default HuggingFaceConfigElement
