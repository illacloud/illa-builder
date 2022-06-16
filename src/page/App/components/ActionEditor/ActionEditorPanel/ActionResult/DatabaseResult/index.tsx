import { FC } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "@illa-design/table"
import { Tabs, TabPane } from "@illa-design/tabs"
import { JSONViewer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/JSONViewer"
import { DatabaseResultProps } from "./interface"

export const DatabaseResult: FC<DatabaseResultProps> = (props) => {
  const { result } = props
  const data = result?.response?.data
  const { t } = useTranslation()

  const columns = data?.length
    ? Object.keys(data[0]).map((k) => {
        return {
          accessor: k,
          Header: `${k}`,
        }
      })
    : []

  return (
    <Tabs variant="text">
      <TabPane key={"table"} title={t("editor.action.result.title.table")}>
        <Table
          data={data}
          columns={columns}
          striped
          tableLayout="fixed"
          disableRowSelect
          disableFilters
        />
      </TabPane>
      <TabPane key={"json"} title={t("editor.action.result.title.json")}>
        <JSONViewer src={data} />
      </TabPane>
    </Tabs>
  )
}

DatabaseResult.displayName = "DatabaseResult"
