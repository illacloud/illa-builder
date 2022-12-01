import { FC, useMemo, useState } from "react"
import { ReduceIcon, Trigger } from "@illa-design/react"
import { ItemProps } from "./interface"
import { LabelNameAndDragIcon } from "./labelName"
import { Modal } from "./modal"
import { deleteIconStyle, itemWrapperStyle } from "./style"

export const Item: FC<ItemProps> = (props) => {
  const {
    name,
    otherKeys,
    isSelected,
    index,
    handleChangSectionView,
    handleDeleteSectionView,
    path,
    handleUpdateItem,
    attrPath,
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
      content={
        <Modal
          onCloseModal={() => {
            setModalVisible(false)
          }}
          name={name}
          path={path}
          handleUpdateItem={handleUpdateItem}
          attrPath={attrPath}
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
