import { LayoutAutoChange } from "@illa-public/layout-auto-change"
import { FC, useState } from "react"
import ChangeLogModal from "./components/ChangeLogModal"
import { MobileDashBoardLayout } from "./layout/mobile"
import { PCDashBoardLayout } from "./layout/pc/"

const Workspace: FC = () => {
  const [changeLogVisible, setChangeLogVisible] = useState<boolean>(false)

  const onOpenChangeLogModal = () => {
    setChangeLogVisible(true)
  }

  return (
    <>
      <LayoutAutoChange
        desktopPage={
          <PCDashBoardLayout onOpenChangeLogModal={onOpenChangeLogModal} />
        }
        mobilePage={
          <MobileDashBoardLayout onOpenChangeLogModal={onOpenChangeLogModal} />
        }
      />
      {changeLogVisible && (
        <ChangeLogModal onClose={() => setChangeLogVisible(false)} />
      )}
    </>
  )
}

Workspace.displayName = "Workspace"

export default Workspace
