import { ILLA_MIXPANEL_EVENT_TYPE } from "@illa-public/mixpanel-utils"
import { FC, memo, useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch } from "react-redux"
import {
  Dropdown,
  PlusIcon,
  SettingIcon,
  Trigger,
  useMessage,
} from "@illa-design/react"
import HomepageIcon from "@/assets/dataWorkspace/homepage.svg?react"
import WebsiteIcon from "@/assets/dataWorkspace/website.svg?react"
import { componentsActions } from "@/redux/currentApp/components/componentsSlice"
import { executionActions } from "@/redux/currentApp/executionTree/executionSlice"
import { trackInEditor } from "@/utils/mixpanelHelper"
import { isValidDisplayName } from "@/utils/typeHelper"
import { ActionMenu } from "../ActionMenu"
import { Modal } from "../ChangePathModal/modal"
import { PageItemProps } from "./interface"
import {
  actionAreaContainerStyle,
  baseIconStyle,
  iconHotSpotContainerStyle,
  pageItemContainerStyle,
  pageItemInnerContainerStyle,
  pageNameContainerStyle,
  pageNameStyle,
  parentPageNameStyle,
  plusIconStyle,
} from "./style"

const PageItem: FC<PageItemProps> = (props) => {
  const {
    isHomePage,
    pageName,
    level = 1,
    parentPageName,
    subPagePaths,
    currentPagePath,
    currentSubPagePath,
  } = props

  const isSelected = !currentSubPagePath && currentPagePath === pageName
  const subPageIsSelected =
    currentPagePath === parentPageName && pageName === currentSubPagePath

  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const [actionMenuVisible, setActionMenuVisible] = useState(false)
  const [currentPageName, setCurrentPageName] = useState(pageName)
  const message = useMessage()
  const { t } = useTranslation()

  const handleClickChangePage = useCallback(() => {
    if (!parentPageName) {
      dispatch(
        executionActions.updateCurrentPagePathReducer({
          pageDisplayName: pageName,
        }),
      )
    } else {
      dispatch(
        executionActions.updateCurrentPagePathReducer({
          pageDisplayName: parentPageName,
          subPagePath: pageName,
        }),
      )
    }
  }, [dispatch, pageName, parentPageName])

  const handlerAfterClose = useCallback(() => {
    if (!parentPageName) {
      if (!isValidDisplayName(currentPageName)) {
        message.error({
          content: t("editor.display_name.validate_error", {
            displayName: currentPageName,
          }),
        })
        setCurrentPageName(pageName)
        return
      }
      dispatch(
        componentsActions.updateComponentDisplayNameReducer({
          displayName: pageName,
          newDisplayName: currentPageName,
        }),
      )
    } else {
      dispatch(
        componentsActions.updateSubPagePathReducer({
          pageName: parentPageName,
          subPagePath: currentPageName,
          oldSubPagePath: pageName,
        }),
      )
    }
  }, [currentPageName, dispatch, message, pageName, parentPageName, t])
  const handleOpenModal = useCallback(() => {
    setModalVisible(true)
  }, [])

  const addSubPage = useCallback(() => {
    if (!parentPageName) {
      dispatch(
        componentsActions.addSubPageReducer({
          pageName: pageName,
        }),
      )
    }
  }, [dispatch, pageName, parentPageName])

  return (
    <>
      <Trigger
        withoutPadding
        colorScheme="white"
        popupVisible={modalVisible}
        content={
          <Modal
            path={currentPageName}
            onCloseModal={() => {
              setModalVisible(false)
            }}
            handleUpdateItem={setCurrentPageName}
            isParentPage={level === 1}
          />
        }
        trigger="focus"
        showArrow={false}
        position="right"
        clickOutsideToClose
        onVisibleChange={(visible) => {
          if (visible) {
            trackInEditor(ILLA_MIXPANEL_EVENT_TYPE.SHOW, {
              element: "edit_view_show",
            })
          }
          if (!visible) {
            setModalVisible(false)
            handlerAfterClose()
          }
        }}
      >
        <span>
          <Dropdown
            position="bottom-end"
            trigger="contextmenu"
            popupVisible={actionMenuVisible}
            dropList={
              <ActionMenu
                pageDisplayName={pageName}
                isParentPage={level === 1}
                parentPageName={parentPageName}
                openRenameModal={handleOpenModal}
              />
            }
            onVisibleChange={setActionMenuVisible}
          >
            <div
              css={pageItemContainerStyle(
                isSelected || subPageIsSelected,
                level,
              )}
              onClick={handleClickChangePage}
            >
              <div css={pageItemInnerContainerStyle}>
                <div css={pageNameContainerStyle}>
                  {!parentPageName && <WebsiteIcon />}
                  {parentPageName && (
                    <span css={parentPageNameStyle}>/{parentPageName}</span>
                  )}
                  <span css={pageNameStyle}>/{pageName}</span>
                </div>
                <div css={actionAreaContainerStyle} className="icon-area">
                  {isHomePage && (
                    <div css={iconHotSpotContainerStyle}>
                      <HomepageIcon css={baseIconStyle} />
                    </div>
                  )}
                  <div
                    css={iconHotSpotContainerStyle}
                    onClick={() => {
                      setActionMenuVisible(true)
                    }}
                  >
                    <SettingIcon css={plusIconStyle} />
                  </div>
                  {level === 1 && (
                    <div css={iconHotSpotContainerStyle} onClick={addSubPage}>
                      <PlusIcon css={plusIconStyle} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Dropdown>
        </span>
      </Trigger>
      {subPagePaths &&
        Array.from(subPagePaths).map((subPagePath) => {
          return (
            <PageItem
              key={subPagePath}
              level={level + 1}
              parentPageName={pageName}
              isHomePage={false}
              pageName={subPagePath}
              currentPagePath={currentPagePath}
              currentSubPagePath={currentSubPagePath}
            />
          )
        })}
    </>
  )
}

PageItem.displayName = "DataWorkspace-PageItem"
export default memo(PageItem)
