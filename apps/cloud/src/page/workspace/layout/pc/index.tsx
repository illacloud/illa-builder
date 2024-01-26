import { PCCloudDashBoardLayout } from "@illa-public/cloud-dashboard-layout"
import { BottomList } from "@illa-public/cloud-dashboard-layout/components/BottomList"
import { USER_ROLE } from "@illa-public/public-types"
import {
  currentUserActions,
  getCurrentTeamInfo,
  getCurrentUserID,
  getIsTutorialViewed,
  getPlanUtils,
} from "@illa-public/user-data"
import {
  ACTION_MANAGE,
  ATTRIBUTE_GROUP,
  canManage,
} from "@illa-public/user-role-utils"
import { getAuthToken, getILLABuilderURL } from "@illa-public/utils"
import { FC, Suspense, useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { useModal } from "@illa-design/react"
import { FullSectionLoading } from "@/components/FullSectionLoading"
import { DashBoardDynamicMenu } from "@/page/workspace/components/DynamicMenu"
import { UpgradeTip } from "@/page/workspace/components/UpgradeTip"
import { updateTutorialViewed } from "@/services/user"
import { WorkspaceLayoutProps } from "../interface"

export const PCDashBoardLayout: FC<WorkspaceLayoutProps> = ({
  onOpenChangeLogModal,
  openToCloudModal,
}) => {
  const currentTeamInfo = useSelector(getCurrentTeamInfo)
  const isLogin = useSelector(getCurrentUserID)
  const currentUserRole = currentTeamInfo?.myRole ?? USER_ROLE.VIEWER
  const dispatch = useDispatch()
  const isTutorialViewed = useSelector(getIsTutorialViewed)
  const teamPlan = getPlanUtils(currentTeamInfo)
  const modal = useModal()
  const { t } = useTranslation()
  const guideOpened = useRef(false)
  const { teamIdentifier } = useParams()

  const canEditApp = canManage(
    currentUserRole,
    ATTRIBUTE_GROUP.APP,
    teamPlan,
    ACTION_MANAGE.EDIT_APP,
  )

  const handleClickMenuItem = (key: string) => {
    if (key === "change-log") {
      onOpenChangeLogModal()
    }
  }

  useEffect(() => {
    if (
      !isTutorialViewed &&
      canEditApp &&
      !guideOpened.current &&
      teamIdentifier
    ) {
      guideOpened.current = true

      modal.show({
        id: "openGuide",
        title: t("tutorial.modal.tutorial.first_time.title"),
        children: t("tutorial.modal.tutorial.first_time.description"),
        cancelText: t("tutorial.modal.tutorial.first_time.cancel"),
        okText: t("tutorial.modal.tutorial.first_time.take"),
        okButtonProps: {
          colorScheme: "techPurple",
        },
        onOk: () => {
          window.open(
            `${getILLABuilderURL()}/${teamIdentifier}/guide?token=${getAuthToken()}`,
          )
        },
        afterOpen: () => {
          dispatch(currentUserActions.updateUserIsTutorialViewedReducer(true))
          try {
            updateTutorialViewed(true)
          } catch (_ignore) {}
        },
      })
    }
  }, [canEditApp, dispatch, isTutorialViewed, modal, t, teamIdentifier])

  return (
    <PCCloudDashBoardLayout
      dynamicMenu={
        <div>
          <DashBoardDynamicMenu />
        </div>
      }
      tipsComponent={<UpgradeTip openToCloudModal={openToCloudModal} />}
      bottomComponent={
        <BottomList onClickMenuItemCallback={handleClickMenuItem} />
      }
    >
      {isLogin && (
        <Suspense fallback={<FullSectionLoading />}>
          <Outlet />
        </Suspense>
      )}
    </PCCloudDashBoardLayout>
  )
}
