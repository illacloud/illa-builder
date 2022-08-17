import { FC } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import {
  MysqlResource,
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

function getDbName(resourceType: string): string {
  let name = ""
  switch (resourceType) {
    case "mysql":
      return "Mysql"
    case "restapi":
      return "RestApi"
    case "mongodb":
      return "MongoDb"
    case "redis":
      return "Redis"
    case "postgresql":
      return "PostgreSql"
  }
  return name
}

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const resourcesList: ResourceListState = useSelector(getAllResources)

  const resourceData: ResourceTableData[] = resourcesList.map(
    (resource: Resource<ResourceContent>) => {
      let dbName = "Null"
      switch (resource.resourceType) {
        case "restapi":
          break
        case "mongodb":
          break
        case "redis":
          break
        case "postgresql":
          break
        case "mysql":
          dbName = (resource as Resource<MysqlResource>).content.databaseName
          break
      }
      return {
        id: resource.resourceId,
        name: resource.resourceName,
        type: getDbName(resource.resourceType),
        databaseName: dbName,
        created: resource.createdAt,
      } as ResourceTableData
    },
  )

  const columns: ColumnDef<ResourceTableData>[] = [
    {
      header: t("dashboard.resource.resource_name"),
      accessorKey: "name",
      cell: props => {
        const type = resourcesList[props.row.index].resourceType
        return (
          <Space size="8px">
            {getIconFromResourceType(type, "24px")}
            <span css={applyTableTextStyle(true)}>
              {props.getValue() as string}
            </span>
          </Space>
        )
      },
    },
    {
      header: t("dashboard.resource.resource_type"),
      accessorKey: "type",
      cell: props => (
        <span css={applyTableTextStyle(false)}>
          {props.getValue() as string}
        </span>
      ),
    },
    {
      header: t("dashboard.resource.dbname"),
      accessorKey: "databaseName",
      cell: props => (
        <span
          css={applyTableTextStyle((props.getValue() as string) !== "Null")}
        >
          {props.getValue() as string}
        </span>
      ),
    },
    {
      header: t("dashboard.resource.created"),
      accessorKey: "created",
      cell: props => (
        <span css={applyTableTextStyle(true)}>
          {props.getValue() as string}
        </span>
      ),
    },
    {
      header: "",
      enableSorting: false,
      accessorKey: "id",
      cell: props => (
        <DashboardResourceItemMenu resourceId={props.getValue() as string} />
      ),
    },
  ]

  return (
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <span css={listTitleStyle}>{t("resources")}</span>
        <Button colorScheme="techPurple">
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
          disableFilters
        />
      ) : null}
      {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
    </div>
  )
}

DashboardResources.displayName = "DashboardResources"
