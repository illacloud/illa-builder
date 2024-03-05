import {
  ILLA_MIXPANEL_BUILDER_PAGE_NAME,
  MixpanelTrackProvider,
} from "@illa-public/mixpanel-utils"
import { getInitialContent } from "@illa-public/public-configs"
import { Resource } from "@illa-public/public-types"
import {
  ACTION_MODAL_WIDTH,
  ResourceCreator,
  ResourceGenerator,
  ResourceGeneratorProvider,
} from "@illa-public/resource-generator"
import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Modal, Space, TriggerProvider } from "@illa-design/react"
import {
  getCachedAction,
  getSelectedAction,
} from "@/redux/config/configSelector"
import { configActions } from "@/redux/config/configSlice"
import { getAllResources } from "@/redux/resource/resourceSelector"
import { resourceActions } from "@/redux/resource/resourceSlice"
import { track } from "@/utils/mixpanelHelper"
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
  const resourceList = useSelector(getAllResources)

  const action = useSelector(getCachedAction)!!
  const selectedAction = useSelector(getSelectedAction)!!

  const dispatch = useDispatch()

  const createOrUpdateResourceCallback = (
    resource: Resource,
    isUpdate: boolean,
  ) => {
    setEditorVisible(false)
    setGeneratorVisible(false)
    if (isUpdate) {
      dispatch(resourceActions.updateResourceItemReducer(resource))
    } else {
      dispatch(resourceActions.addResourceItemReducer(resource))
      dispatch(
        configActions.updateCachedAction({
          ...action,
          actionType: resource.resourceType,
          resourceID: resource.resourceID,
          content:
            selectedAction.actionType === resource.resourceType
              ? selectedAction.content
              : getInitialContent(resource.resourceType),
        }),
      )
    }
  }

  return (
    <MixpanelTrackProvider
      basicTrack={track}
      pageName={ILLA_MIXPANEL_BUILDER_PAGE_NAME.EDITOR}
    >
      <ResourceGeneratorProvider
        allResource={resourceList}
        createOrUpdateResourceCallback={createOrUpdateResourceCallback}
      >
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
            />
          </Modal>
          <ResourceGenerator
            visible={generatorVisible}
            onClose={() => {
              setGeneratorVisible(false)
            }}
          />
        </TriggerProvider>
      </ResourceGeneratorProvider>
    </MixpanelTrackProvider>
  )
}

export default PanelHeader
