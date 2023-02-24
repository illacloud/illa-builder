import { CellContext, ColumnDef } from "@tanstack/react-table"
import { FC, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { useSelector } from "react-redux"
import { Button, Empty, Space, Table } from "@illa-design/react"
import { canAccess } from "@/illa-public-component/UserRoleUtils"
import {
  ACTION_ACCESS,
  ATTRIBUTE_GROUP,
  USER_ROLE,
} from "@/illa-public-component/UserRoleUtils/interface"
import { getIconFromResourceType } from "@/page/App/components/Actions/getIcon"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
} from "@/page/Dashboard/DashboardApps/style"
import { ResourceTableData } from "@/page/Dashboard/DashboardResources/interface"
import {
  applyTableTextStyle,
  dataBaseTextStyle,
  hoverStyle,
  resourceNameStyle,
} from "@/page/Dashboard/DashboardResources/style"
import { DashboardResourceItemMenu } from "@/page/Dashboard/components/DashboardResourceItemMenu"
import { ResourceGenerator } from "@/page/Dashboard/components/ResourceGenerator"
import { MicrosoftSqlResource } from "@/redux/resource/microsoftSqlResource"
import {
  MongoDbConfig,
  MongoDbGuiConfigContent,
  MongoDbResource,
} from "@/redux/resource/mongodbResource"
import { MysqlLikeResource } from "@/redux/resource/mysqlLikeResource"
import { RedisResource } from "@/redux/resource/redisResource"
import { getAllResources } from "@/redux/resource/resourceSelector"
import {
  Resource,
  ResourceContent,
  ResourceListState,
} from "@/redux/resource/resourceState"
import {
  SnowflakeAuthenticationType,
  SnowflakeResource,
} from "@/redux/resource/snowflakeResource"
import { getCurrentTeamInfo } from "@/redux/team/teamSelector"
import { getResourceNameFromResourceType } from "@/utils/actionResourceTransformer"
import { fromNow } from "@/utils/dayjs"

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const teamInfo = useSelector(getCurrentTeamInfo)
  const resourcesList: ResourceListState = useSelector(getAllResources)

  const [newResourceVisible, setNewResourceVisible] = useState(false)

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
          <span
            css={[
              applyTableTextStyle(props.getValue() !== "Null"),
              dataBaseTextStyle,
            ]}
          >
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
  }, [t])

  const canAccessResourcesView = canAccess(
    teamInfo?.myRole ?? USER_ROLE.VIEWER,
    ATTRIBUTE_GROUP.RESOURCE,
    ACTION_ACCESS.VIEW,
  )

  if (teamInfo && !canAccessResourcesView) {
    throw Error(`can not access resources view`)
  }

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
            pinedHeader
            striped
            hoverable
            clickOutsideToResetRowSelect
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

export default DashboardResources

DashboardResources.displayName = "DashboardResources"
