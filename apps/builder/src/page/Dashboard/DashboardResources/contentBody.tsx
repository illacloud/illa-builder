import { CellContext, ColumnDef } from "@tanstack/react-table"
import { FC, useMemo } from "react"
import { useTranslation } from "react-i18next"
import { useAsyncValue } from "react-router-dom"
import { Empty, Space, Table } from "@illa-design/react"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import { ResourceTableData } from "@/page/Dashboard/DashboardResources/interface"
import {
  applyTableTextStyle,
  hoverStyle,
  resourceNameStyle,
} from "@/page/Dashboard/DashboardResources/style"
import { DashboardResourceItemMenu } from "@/page/Dashboard/components/DashboardResourceItemMenu"
import { AppWriteResource } from "@/redux/resource/appWriteResource"
import { MicrosoftSqlResource } from "@/redux/resource/microsoftSqlResource"
import {
  MongoDbConfig,
  MongoDbGuiConfigContent,
  MongoDbResource,
} from "@/redux/resource/mongodbResource"
import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import { NeonResource } from "@/redux/resource/neonResource"
import { OracleResource } from "@/redux/resource/oracleResource"
import { RedisResource } from "@/redux/resource/redisResource"
import {
  Resource,
  ResourceContent,
  ResourceListState,
} from "@/redux/resource/resourceState"
import {
  SnowflakeAuthenticationType,
  SnowflakeResource,
} from "@/redux/resource/snowflakeResource"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { fromNow } from "@/utils/dayjs"

export const ResourcesContentBody: FC = () => {
  const { data: resourcesList } = useAsyncValue() as {
    data: ResourceListState
  }
  const { t } = useTranslation()

  const resourceData: ResourceTableData[] = useMemo(() => {
    return resourcesList.map((resource: Resource<ResourceContent>) => {
      let dbName = "Null"
      switch (resource.resourceType) {
        case "firebase":
        case "smtp":
        case "restapi":
        case "elasticsearch":
        case "dynamodb":
        case "s3":
        case "huggingface":
        case "hfendpoint":
        case "couchdb":
        case "googlesheets":
          break
        case "clickhouse":
        case "supabasedb":
        case "postgresql":
        case "mysql":
        case "tidb":
        case "mariadb":
          dbName = (resource as Resource<MysqlLikeResource>).content
            .databaseName
          break
        case "neon":
          dbName = (resource as Resource<NeonResource>).content.databaseName
          break
        case "redis":
          dbName = (
            resource as Resource<RedisResource>
          ).content.databaseIndex.toString()
          break
        case "mssql":
          dbName = (resource as Resource<MicrosoftSqlResource>).content
            .databaseName
          break
        case "mongodb":
          const mongoRes = resource as Resource<MongoDbResource<MongoDbConfig>>
          if (mongoRes.content.configType == "gui") {
            dbName = (mongoRes.content.configContent as MongoDbGuiConfigContent)
              .databaseName
          }
          break
        case "snowflake":
          dbName = (
            resource.content as SnowflakeResource<SnowflakeAuthenticationType>
          ).database
          break
        case "appwrite":
          dbName = (resource.content as AppWriteResource).databaseID
          break
        case "oracle":
          dbName = (resource.content as OracleResource).name
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
              <span css={[applyTableTextStyle(true), resourceNameStyle]}>
                {props.getValue()}
              </span>
            </Space>
          )
        },
        size: 250,
        minSize: 100,
      },
      {
        header: t("dashboard.resource.resource_type"),
        accessorKey: "type",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <span css={applyTableTextStyle(false)}>{props.getValue()}</span>
        ),
        minSize: 120,
      },
      {
        header: t("dashboard.resource.dbname"),
        accessorKey: "databaseName",
        cell: (props: CellContext<ResourceTableData, string>) => (
          <span css={applyTableTextStyle(props.getValue() !== "Null")}>
            {props.getValue()}
          </span>
        ),
        size: 220,
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
  }, [t])

  return (
    <>
      {resourcesList?.length ? (
        <Table
          _css={hoverStyle}
          pinedHeader
          striped
          hoverable
          enableColumnResizing
          clickOutsideToResetRowSelect
          size="large"
          data={resourceData}
          columns={columns}
        />
      ) : null}
      {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
    </>
  )
}
