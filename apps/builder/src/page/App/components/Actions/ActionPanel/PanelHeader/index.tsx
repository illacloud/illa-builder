import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Modal, Space, TriggerProvider } from "@illa-design/react"
import { ResourceGenerator } from "@/page/App/components/Actions/ResourceGenerator"
import { ResourceCreator } from "@/page/App/components/Actions/ResourceGenerator/ResourceCreator"
import { getCachedAction } from "@/redux/config/configSelector"
import { ACTION_MODAL_WIDTH } from "../../ActionGenerator"
import ResourceChoose from "./ResourceChoose"
import TriggerModeChoose from "./TriggerModeChoose"
import {
  resourceChooseContainerStyle,
  resourceEndStyle,
  resourceTitleStyle,
  spaceStyle,
} from "./style"

const PanelHeader: FC = () => {
  const { t } = useTranslation()
  const [editorVisible, setEditorVisible] = useState(false)
  const [generatorVisible, setGeneratorVisible] = useState(false)

  const action = useSelector(getCachedAction)!!

  return (
    <TriggerProvider renderInBody zIndex={10}>
      <div css={resourceChooseContainerStyle}>
        <span css={resourceTitleStyle}>{t("resources")}</span>
        <div css={resourceEndStyle}>
          <ResourceChoose
            setGeneratorVisible={setGeneratorVisible}
            setEditorVisible={setEditorVisible}
          />
          <TriggerModeChoose />
        </div>
      </div>
      <Space w="100%" h="8px" css={spaceStyle} disp="block" />
      <Modal
        w={`${ACTION_MODAL_WIDTH}px`}
        visible={editorVisible}
        footer={false}
        closable
        withoutLine
        withoutPadding
        maskClosable={false}
        onCancel={() => {
          setEditorVisible(false)
        }}
      >
        <ResourceCreator
          resourceID={action.resourceID}
          onBack={() => {
            setEditorVisible(false)
          }}
          onFinished={() => {
            setEditorVisible(false)
          }}
        />
      </Modal>
      <ResourceGenerator
        visible={generatorVisible}
        onClose={() => {
          setGeneratorVisible(false)
        }}
      />
    </TriggerProvider>
  )
}

export default PanelHeader
