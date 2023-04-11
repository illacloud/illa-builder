import { FC, useCallback, useState } from "react"
import { Trigger } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { IconTriggerComponent } from "@/page/App/components/PanelSetters/IconSetter/IconTriggerComponent"
import { BaseIconSetter } from "@/page/App/components/PanelSetters/IconSetter/baseIconSetter"
import {
  IconDataType,
  IconSelectorProps,
} from "@/page/App/components/PanelSetters/IconSetter/interface"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { AllData } from "@/widgetLibrary/IconWidget/utils"

export const IconSelector: FC<IconSelectorProps> = (props) => {
  const { value, widgetType, attrName } = props
  const [rightPanelData, setRightPanelData] = useState<IconDataType>({
    name: value,
    getIcon: AllData[value],
  })
  const [modalVisible, setModalVisible] = useState(false)

  const handleCurrentIconClick = useCallback(
    ({ getIcon, name }: IconDataType) => {
      trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CHANGE, {
        element: "component_inspect_select",
        parameter1: widgetType,
        parameter2: attrName,
        parameter3: name,
      })
      setRightPanelData({ getIcon, name })
      setModalVisible(false)
    },
    [attrName, widgetType],
  )

  const handleCloseModal = useCallback(
    (visible: boolean) => {
      if (visible) {
        trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.CLICK, {
          element: "component_inspect_select",
          parameter1: widgetType,
          parameter2: attrName,
        })
      }
      setModalVisible(visible)
    },
    [attrName, widgetType],
  )

  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <IconTriggerComponent
          handleCurrentIconClick={handleCurrentIconClick}
          handleCloseModal={handleCloseModal}
        />
      }
      trigger="click"
      showArrow={false}
      position="left-start"
      clickOutsideToClose
      onVisibleChange={handleCloseModal}
    >
      <div>
        <BaseIconSetter {...props} showData={rightPanelData} />
      </div>
    </Trigger>
  )
}
IconSelector.displayName = "IconSelector"
