import { FC, useState, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { Table } from "@illa-design/table"
import { Tabs, TabPane } from "@illa-design/tabs"
import { JSONViewer } from "@/page/App/components/ActionEditor/ActionEditorPanel/ActionResult/JSONViewer"
import { DatabaseResultProps } from "./interface"

export const DatabaseResult: FC<DatabaseResultProps> = (props) => {
  const { result } = props
  const data = result?.data
  const { t } = useTranslation()
  const [activeKey, setActiveKey] = useState<string>("table")

  const keys = data?.length ? Object.keys(data[0]).map((k) => k) : []

  const columns = useMemo(() => {
    return keys.length
      ? keys.map((k) => {
          return {
            accessor: k,
            Header: `${k}`,
          }
        })
      : []
  }, [keys])

  return (
    <Tabs variant="text" onChange={setActiveKey} activeKey={activeKey}>
      <TabPane key="table" title={t("editor.action.result.title.table")}>
        <Table
          size="small"
          data={data}
          columns={columns}
          striped
          tableLayout="fixed"
          disableRowSelect
          disableFilters
        />
      </TabPane>
      <TabPane key="json" title={t("editor.action.result.title.json")}>
        <JSONViewer src={data} collapsed={activeKey !== "json" ? 0 : false} />
      </TabPane>
    </Tabs>
  )
}

DatabaseResult.displayName = "DatabaseResult"
