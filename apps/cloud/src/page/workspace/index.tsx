import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC, useState } from "react"
import ChangeLogModal from "./components/ChangeLogModal"
import { ToCloudModal } from "./components/ToCloudModal"
import { MobileDashBoardLayout } from "./layout/mobile"
import { PCDashBoardLayout } from "./layout/pc/"

const Workspace: FC = () => {
  const [changeLogVisible, setChangeLogVisible] = useState<boolean>(false)
  const [toCloudModalVisible, setToCloudModalVisible] = useState<boolean>(false)

  const onOpenChangeLogModal = () => {
    setChangeLogVisible(true)
  }

  const openToCloudModal = () => {
    setToCloudModalVisible(true)
  }

  return (
    <>
      <LayoutAutoChange
        desktopPage={
          <PCDashBoardLayout
            onOpenChangeLogModal={onOpenChangeLogModal}
            openToCloudModal={openToCloudModal}
          />
        }
        mobilePage={
          <MobileDashBoardLayout
            onOpenChangeLogModal={onOpenChangeLogModal}
            openToCloudModal={openToCloudModal}
          />
        }
      />
      {changeLogVisible && (
        <ChangeLogModal onClose={() => setChangeLogVisible(false)} />
      )}
      {toCloudModalVisible && (
        <ToCloudModal onClose={() => setToCloudModalVisible(false)} />
      )}
    </>
  )
}

Workspace.displayName = "Workspace"

export default Workspace
