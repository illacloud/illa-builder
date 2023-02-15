import { FC, useCallback, useState } from "react"
import { Trigger } from "@illa-design/react"
import { IconTriggerComponent } from "@/page/App/components/PanelSetters/IconSetter/IconTriggerComponent"
import { BaseIconSetter } from "@/page/App/components/PanelSetters/IconSetter/baseIconSetter"
import {
  IconDataType,
  IconSelectorProps,
} from "@/page/App/components/PanelSetters/IconSetter/interface"
import { AllData } from "@/widgetLibrary/IconWidget/utils"

export const IconSelector: FC<IconSelectorProps> = (props) => {
  const { value } = props
  const [rightPanelData, setRightPanelData] = useState<IconDataType>({
    name: value,
    getIcon: AllData[value],
  })
  const [modalVisible, setModalVisible] = useState(false)

  const handleCurrentIconClick = useCallback(
    ({ getIcon, name }: IconDataType) => {
      setRightPanelData({ getIcon, name })
      setModalVisible(false)
    },
    [],
  )

  const handleCloseModal = useCallback((visible: boolean) => {
    setModalVisible(visible)
  }, [])

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
