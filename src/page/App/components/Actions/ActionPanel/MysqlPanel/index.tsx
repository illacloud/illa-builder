import { FC } from "react"
import { ActionPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { mysqlContainerStyle } from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"
import { ResourceChoose } from "@/page/App/components/Actions/ActionPanel/ResourceChoose"
import { MysqlAction } from "@/redux/currentApp/action/actionState"
import { useDispatch, useSelector } from "react-redux"
import { getSelectedAction } from "@/redux/config/configSelector"

export const MysqlPanel: FC<ActionPanelProps<MysqlAction>> = () => {
  const action = useSelector(getSelectedAction)
  const dispatch = useDispatch()

  return (
    <div css={mysqlContainerStyle}>
      <ResourceChoose />
    </div>
  )
}

MysqlPanel.displayName = "MysqlPanel"
