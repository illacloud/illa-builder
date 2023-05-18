import { FC, useCallback, useContext, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import {
  DragPointIcon,
  Trigger,
  WarningCircleIcon,
  getColor,
} from "@illa-design/react"
import { OptionListSetterContext } from "@/page/App/components/PanelSetters/OptionListSetter/context/optionListContext"
import { DragIconAndLabelProps } from "@/page/App/components/PanelSetters/OptionListSetter/interface"
import {
  labelNameAndIconStyle,
  labelNameWrapperStyle,
  labelWrapperStyle,
  movableIconWrapperStyle,
} from "@/page/App/components/PanelSetters/OptionListSetter/style"
import { BaseModal } from "@/page/App/components/PanelSetters/PublicComponent/Modal"

export const DragIconAndLabel: FC<DragIconAndLabelProps> = (props) => {
  const { index, label } = props
  const [modalVisible, setModalVisible] = useState(false)
  const { widgetDisplayName, attrPath, allViewsKeys, childrenSetter } =
    useContext(OptionListSetterContext)

  const { t } = useTranslation()

  const currentKey = allViewsKeys[index] ?? ""
  const otherViewKeys = useMemo(
    () => allViewsKeys.filter((key, i) => i != index),
    [allViewsKeys, index],
  )

  const isDuplicationKey = useMemo(() => {
    return otherViewKeys.some((viewKey) => viewKey == currentKey)
  }, [otherViewKeys, currentKey])

  const handleCloseModal = useCallback(() => {
    setModalVisible(false)
  }, [])

  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <BaseModal
          title={t("editor.inspect.setter_content.option_list.model_title")}
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
      <div css={labelNameAndIconStyle}>
        <span css={movableIconWrapperStyle} className="movableIconWrapper">
          <DragPointIcon />
        </span>
        <div css={labelWrapperStyle}>
          <span css={labelNameWrapperStyle}>
            {label ||
              t("editor.inspect.setter_content.option_list.list_no_label")}
          </span>
          {isDuplicationKey && (
            <Trigger
              trigger="hover"
              showArrow={false}
              position="bottom"
              content={`${t("widget.container.key_duplicated")}`}
            >
              <WarningCircleIcon color={getColor("orange", "03")} size="14px" />
            </Trigger>
          )}
        </div>
      </div>
    </Trigger>
  )
}

DragIconAndLabel.displayName = "DragIconAndLabel"
