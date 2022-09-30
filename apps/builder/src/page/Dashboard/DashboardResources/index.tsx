import { FC, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import {
  MysqlResource,
  PostgreSqlResource,
  Resource,
  ResourceContent,
  ResourceListState,
} from "@/redux/resource/resourceState"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "@/page/Dashboard/DashboardApps/style"
import { ColumnDef } from "@tanstack/react-table"
import { ResourceTableData } from "@/page/Dashboard/DashboardResources/interface"
import {
  applyTableTextStyle,
  hoverStyle,
} from "@/page/Dashboard/DashboardResources/style"
import { Space } from "@illa-design/space"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { DashboardResourceItemMenu } from "@/page/Dashboard/components/DashboardResourceItemMenu"
import { fromNow } from "@/utils/dayjs"
import { CellContext } from "@tanstack/table-core"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const resourcesList: ResourceListState = useSelector(getAllResources)

  const [newResourceVisible, setNewResourceVisible] = useState(false)

  const resourceData: ResourceTableData[] = useMemo(() => {
    return resourcesList.map((resource: Resource<ResourceContent>) => {
      let dbName = "Null"
      switch (resource.resourceType) {
        case "restapi":
          break
        case "postgresql":
          dbName = (resource as Resource<PostgreSqlResource>).content
            .databaseName
          break
        case "mysql":
          dbName = (resource as Resource<MysqlResource>).content.databaseName
          break
      }
      return {
        id: resource.resourceId,
        name: resource.resourceName,
        resourceType: resource.resourceType,
        type: getResourceNameFromResourceType(resource.resourceType),
        databaseName: dbName,
        created: resource.createdAt,
      } as ResourceTableData
    })
  }, [resourcesList])

  const columns: ColumnDef<ResourceTableData, string>[] = useMemo(() => {
    return [
      {
        header: t("dashboard.resource.resource_name"),
        accessorKey: "name",
        cell: (props: CellContext<ResourceTableData, string>) => {
          const type = props.row.original.resourceType
          return (
            <Space size="8px" alignItems="center" direction="horizontal">
              {getIconFromResourceType(type, "24px")}
              <span css={applyTableTextStyle(true)}>{props.getValue()}</span>
            </Space>
          )
        },
      },
      {
        header: t("dashboard.resource.resource_type"),
        accessorKey: "type",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <span css={applyTableTextStyle(false)}>{props.getValue()}</span>
        ),
      },
      {
        header: t("dashboard.resource.dbname"),
        accessorKey: "databaseName",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <span css={applyTableTextStyle(props.getValue() !== "Null")}>
            {props.getValue()}
          </span>
        ),
      },
      {
        header: t("dashboard.resource.created"),
        accessorKey: "created",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <span css={applyTableTextStyle(true)}>
            {fromNow(props.getValue())}
          </span>
        ),
      },
      {
        header: "",
        enableSorting: false,
        accessorKey: "id",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <DashboardResourceItemMenu resourceId={props.getValue()} />
        ),
      },
    ]
  }, [resourcesList, t])

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("resources")}</span>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              setNewResourceVisible(true)
            }}
          >
            {t("dashboard.resource.create_resource")}
          </Button>
        </div>
        {resourcesList?.length ? (
          <Table
            _css={hoverStyle}
            striped
            hoverable
            size="large"
            data={resourceData}
            columns={columns}
          />
        ) : null}
        {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
      </div>
      <ResourceGenerator
        visible={newResourceVisible}
        onClose={() => {
          setNewResourceVisible(false)
        }}
      />
    </>
  )
}

DashboardResources.displayName = "DashboardResources"
