import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { DragPointIcon, EyeOffIcon, EyeOnIcon } from "@illa-design/icon"
import { Trigger } from "@illa-design/trigger"
import { get } from "lodash"
import {
  dragItemStyle,
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  movableIconWrapperStyle,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import { getExecutionResult } from "@/redux/currentApp/executionTree/executionSelector"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"
import { ColumnListSetterContext } from "@/page/App/components/PanelSetters/ColumnSetter/context/columnListContext"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, label, visible } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, childrenSetter } = useContext(
    ColumnListSetterContext,
  )

  const { t } = useTranslation()
  const executionResult = useSelector(getExecutionResult)

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  console.log("BaseModal", `${attrPath}.${index}`, childrenSetter)
  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          title={label ?? ""}
          handleCloseModal={handleCloseModal}
          attrPath={`${attrPath}.${index}`}
          widgetDisplayName={widgetDisplayName}
          childrenSetter={childrenSetter}
        />
      }
      trigger="click"
      showArrow={false}
      position="left"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setModalVisible(visible)
      }}
    >
      <div css={dragItemStyle}>
        <div css={labelNameAndIconStyle}>
        <span css={movableIconWrapperStyle} className="movableIconWrapper">
          <DragPointIcon />
        </span>
          <span css={labelNameWrapperStyle}>
          {label ||
            t("editor.inspect.setter_content.option_list.list_no_label")}
        </span>
        </div>
        {visible ? <EyeOnIcon /> : <EyeOffIcon />}
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
