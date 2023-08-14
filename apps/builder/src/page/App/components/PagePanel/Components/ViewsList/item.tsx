import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, useCallback, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { ReduceIcon, Trigger, useMessage } from "@illa-design/react"
import { searchDSLByDisplayName } from "@/redux/currentApp/editor/components/componentsSelector"
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
    parentNodeDisplayName,
  } = props
  const [modalVisible, setModalVisible] = useState(false)
  const message = useMessage()

  const isDuplicationPath = useMemo(() => {
    return otherPaths.some((viewKey) => viewKey == path)
  }, [otherPaths, path])

  const [currentPath, useCurrentPath] = useState(path)
  const { t } = useTranslation()

  const handleUpdatePath = useCallback(() => {
    if (currentPath === path) return
    const sectionNode = searchDSLByDisplayName(parentNodeDisplayName)
    if (!sectionNode) return
    const pageNode = searchDSLByDisplayName(sectionNode.parentNode!)
    if (!pageNode) return
    let bodySectionPaths: string[] = []
    if (sectionNode.showName !== "bodySection") {
      const bodySectionNode = pageNode.childrenNode.find(
        (node) => node.showName === "bodySection",
      )
      if (!bodySectionNode) return
      bodySectionPaths =
        bodySectionNode.props?.sectionViewConfigs.map(
          (config: Record<string, string>) => config.path,
        ) ?? []
    }

    if (
      !bodySectionPaths.includes(currentPath) &&
      sectionNode.showName !== "bodySection"
    ) {
      message.info({
        content: t("editor.page.message.new_path"),
      })
    }

    handleUpdateItem(`${attrPath}.path`, currentPath)
  }, [
    attrPath,
    currentPath,
    handleUpdateItem,
    message,
    parentNodeDisplayName,
    path,
    t,
  ])

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
          path={currentPath}
          handleUpdateItem={useCurrentPath}
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
        } else {
          handleUpdatePath()
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
