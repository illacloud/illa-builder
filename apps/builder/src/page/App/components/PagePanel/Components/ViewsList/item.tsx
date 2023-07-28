import { FC, useCallback, useMemo, useState } from "react"
import { ReduceIcon, Trigger } from "@illa-design/react"
import { ILLA_MIXPANEL_EVENT_TYPE } from "@/illa-public-component/MixpanelUtils/interface"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { ItemProps } from "./interface"
import { LabelNameAndDragIcon } from "./labelName"
import { Modal } from "./modal"
import { deleteIconStyle, itemWrapperStyle } from "./style"

export const Item: FC<ItemProps> = (props) => {
  const {
    otherPaths,
    index,
    handleDeleteSectionView,
    path,
    handleUpdateItem,
    attrPath,
  } = props
  const [modalVisible, setModalVisible] = useState(false)
  const isDuplicationPath = useMemo(() => {
    return otherPaths.some((viewKey) => viewKey == path)
  }, [otherPaths, path])

  const handleUpdatePath = useCallback(
    (value: string) => {
      handleUpdateItem(`${attrPath}.path`, value)
    },
    [attrPath, handleUpdateItem],
  )
  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={
        <Modal
          onCloseModal={() => {
            setModalVisible(false)
          }}
          path={path}
          handleUpdateItem={handleUpdatePath}
        />
      }
      trigger="click"
      showArrow={false}
      position="left"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        if (visible) {
          trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
            element: "edit_view_show",
          })
        }
        setModalVisible(visible)
      }}
    >
      <div css={itemWrapperStyle}>
        <LabelNameAndDragIcon
          name={path}
          isDuplicationKey={isDuplicationPath}
        />
        <ReduceIcon
          css={deleteIconStyle}
          onClick={(e) => {
            e.stopPropagation()
            handleDeleteSectionView(index)
          }}
        />
      </div>
    </Trigger>
  )
}
