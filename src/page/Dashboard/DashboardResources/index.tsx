import { FC, ReactNode, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { Divider } from "@illa-design/divider"
import { Tooltip } from "@illa-design/tooltip"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import { RestApiIcon, MoreIcon, PostgresIcon } from "@illa-design/icon"
import { DashboardResource } from "@/redux/dashboard/resources/dashboardResourceState"
import { getDashboardResources } from "@/redux/dashboard/resources/dashboardResourceSelector"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
  itemMenuButtonStyle,
} from "@/page/Dashboard/DashboardApps/style"
import { DashboardResourcesItemMenu } from "@/page/Dashboard/components/DashboardItemMenu/resourcesItemMenu"
import {
  nameIconStyle,
  tableNormalTextStyle,
  tableMainTextStyle,
  tableInfoTextStyle,
} from "./style"

function NameColComponent(type: string, text: string) {
  let icon: ReactNode = null
  if (type) {
    icon = <RestApiIcon css={nameIconStyle} />
  }
  return (
    <>
      {icon}
      <span css={css(tableNormalTextStyle, tableMainTextStyle)}>{text}</span>
    </>
  )
}
function TypeColComponent(text: string) {
  return <span css={tableInfoTextStyle}>{text}</span>
}
function DbNameColComponent(text: string) {
  if (text) {
    return <span css={tableNormalTextStyle}>{text}</span>
  } else {
    return <span css={tableInfoTextStyle}>Null</span>
  }
}
function CtimeColComponent(text: string) {
  return <span css={tableInfoTextStyle}>{text}</span>
}
const ExtraColComponent: FC<{ resourceId: string }> = (props) => {
  const { t } = useTranslation()
  const { resourceId } = props
  return (
    <>
      <Button colorScheme="techPurple">{t("edit")}</Button>
      <Tooltip
        trigger="click"
        colorScheme="white"
        showArrow={false}
        position="br"
        withoutPadding
        clickOutsideToClose
        closeOnInnerClick
        content={<DashboardResourcesItemMenu appId={resourceId} />}
      >
        <Button
          _css={itemMenuButtonStyle}
          colorScheme="grayBlue"
          leftIcon={<MoreIcon />}
        />
      </Tooltip>
    </>
  )
}

export const DashboardResources: FC = () => {
  const { t } = useTranslation()

  const resourcesList: DashboardResource[] = useSelector(getDashboardResources)
  const columns = useMemo(
    () => [
      {
        Header: t("dashboard.resources.table_name"),
        accessor: "nameCol",
        width: 500,
      },
      {
        Header: t("dashboard.resources.table_type"),
        accessor: "typeCol",
      },
      {
        Header: t("dashboard.resources.table_dbname"),
        accessor: "dbNameCol",
      },
      {
        Header: t("dashboard.resources.table_ctime"),
        accessor: "ctimeCol",
      },
      {
        Header: "",
        accessor: "extraCol",
        disableSortBy: true,
        width: 20,
      },
    ],
    [],
  )
  const data = useMemo(() => {
    const result: any[] = []
    resourcesList.forEach((item: DashboardResource, idx: number) => {
      result.push({
        nameCol: NameColComponent(item.resourceType, item.resourceName),
        typeCol: TypeColComponent(item.resourceType),
        dbNameCol: DbNameColComponent(item.databaseName),
        ctimeCol: CtimeColComponent(item.createdAt),
        extraCol: <ExtraColComponent resourceId={item.resourceId} />,
      })
    })
    return result
  }, [resourcesList])

  return (
    <div css={appsContainerStyle}>
      <div css={listTitleContainerStyle}>
        <span css={listTitleStyle}>{t("resources")}</span>
        <Button colorScheme="techPurple">{t("create_new")}</Button>
      </div>
      <Divider direction="horizontal" />
      {resourcesList?.length ? (
        <Table data={data} columns={columns} disableRowSelect />
      ) : null}
      {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
    </div>
  )
}

DashboardResources.displayName = "DashboardResources"
