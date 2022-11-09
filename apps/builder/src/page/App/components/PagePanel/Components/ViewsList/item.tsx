import { ReduceIcon, Trigger } from "@illa-design/react"
import { FC, useMemo, useState } from "react"
import { LabelNameAndDragIcon } from "./labelName"
import { deleteIconStyle, itemWrapperStyle } from "./style"
import { ItemProps } from "./interface"

export const Item: FC<ItemProps> = (props) => {
  const {
    name,
    otherKeys,
    isSelected,
    index,
    handleChangSectionView,
    handleDeleteSectionView,
  } = props
  const [modalVisible, setModalVisible] = useState(false)
  const isDuplicationKey = useMemo(() => {
    return otherKeys.some((viewKey) => viewKey == name)
  }, [otherKeys, name])
  return (
    <Trigger
      withoutPadding
      colorScheme="white"
      popupVisible={modalVisible}
      content={<div>22222</div>}
      trigger="click"
      showArrow={false}
      position="left"
      clickOutsideToClose
      onVisibleChange={(visible) => {
        setModalVisible(visible)
      }}
    >
      <div css={itemWrapperStyle}>
        <LabelNameAndDragIcon
          name={name}
          isDuplicationKey={isDuplicationKey}
          isSelected={isSelected}
          index={index}
          handleChangSectionView={handleChangSectionView}
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
