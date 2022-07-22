import { FC } from "react"
import { ActionPanelProps } from "@/page/App/components/Actions/ActionPanel/interface"
import { mysqlContainerStyle } from "@/page/App/components/Actions/ActionPanel/MysqlPanel/style"

export const MysqlPanel: FC<ActionPanelProps> = () => {
  return <div css={mysqlContainerStyle}></div>
}

MysqlPanel.displayName = "MysqlPanel"
