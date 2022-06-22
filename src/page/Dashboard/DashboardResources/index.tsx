import { FC, ReactNode, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/button"
import { Tooltip } from "@illa-design/tooltip"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import { RestApiIcon, MoreIcon } from "@illa-design/icon"
import { DashboardResource } from "@/redux/resource/resourceState"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
  itemMenuButtonStyle,
  editButtonStyle,
} from "@/page/Dashboard/DashboardApps/style"
import { DashboardResourcesItemMenu } from "@/page/Dashboard/components/DashboardItemMenu/resourcesItemMenu"
import { ActionGenerator } from "@/page/App/components/ActionEditor/ActionGenerator"
import { ResourceForm } from "@/page/App/components/ActionEditor/ResourceForm"
import {
  nameIconStyle,
  tableNormalTextStyle,
  tableMainTextStyle,
  tableInfoTextStyle,
  tableStyle,
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
const ExtraColComponent: FC<{
  resourceId: string
  showFormVisible: any
  setCurId: any
}> = (props) => {
  const { t } = useTranslation()
  const { resourceId, showFormVisible, setCurId } = props
  return (
    <>
      <Button
        className="edit-button"
        _css={editButtonStyle}
        colorScheme="techPurple"
        onClick={() => {
          setCurId(resourceId)
          showFormVisible()
        }}
      >
        {t("edit")}
      </Button>
      <Tooltip
        trigger="click"
        colorScheme="white"
        showArrow={false}
        position="br"
        withoutPadding
        clickOutsideToClose
        closeOnInnerClick
        content={
          <DashboardResourcesItemMenu
            resourceId={resourceId}
            setCurId={setCurId}
            showFormVisible={showFormVisible}
          />
        }
      >
        <Button
          _css={itemMenuButtonStyle}
          colorScheme="grayBlue"
          leftIcon={<MoreIcon size="14px" />}
        />
      </Tooltip>
    </>
  )
}

export const DashboardResources: FC = () => {
  const [actionGeneratorVisible, setActionGeneratorVisible] = useState(false)
  const [formVisible, setFormVisible] = useState(false)
  const [curResourceId, setCurResourceId] = useState<string>("")

  const { t } = useTranslation()

  const resourcesList: DashboardResource[] = useSelector(selectAllResource)

  const countColumnsWidth = (itemWidth: number, minWidth: number) => {
    const windowSizaRate = +(
      (document.documentElement.clientWidth * 0.67) /
      1920
    ).toFixed(2)
    return itemWidth * windowSizaRate < minWidth
      ? minWidth
      : itemWidth * windowSizaRate
  }
  const columns = useMemo(
    () => [
      {
        Header: t("dashboard.resources.table_name"),
        accessor: "nameCol",
        width: `${countColumnsWidth(360, 160)}px`,
      },
      {
        Header: t("dashboard.resources.table_type"),
        accessor: "typeCol",
        width: "150px",
      },
      {
        Header: t("dashboard.resources.table_dbname"),
        accessor: "dbNameCol",
        width: `${countColumnsWidth(520, 200)}px`,
      },
      {
        Header: t("dashboard.resources.table_ctime"),
        accessor: "ctimeCol",
        width: "150px",
      },
      {
        Header: "",
        accessor: "extraCol",
        disableSortBy: true,
        width: "90px",
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
        extraCol: (
          <ExtraColComponent
            resourceId={item.resourceId}
            showFormVisible={() => setFormVisible(true)}
            setCurId={setCurResourceId}
          />
        ),
      })
    })
    return result
  }, [resourcesList])

  return (
    <>
      <div css={appsContainerStyle}>
        <div css={listTitleContainerStyle}>
          <span css={listTitleStyle}>{t("resources")}</span>
          <Button
            colorScheme="techPurple"
            onClick={() => {
              setActionGeneratorVisible(true)
            }}
          >
            {t("create_new")}
          </Button>
        </div>
        {resourcesList?.length ? (
          <Table
            _css={tableStyle}
            data={data}
            columns={columns}
            disableRowSelect
            striped
          />
        ) : null}
        {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
      </div>
      <ActionGenerator
        visible={actionGeneratorVisible}
        onClose={() => setActionGeneratorVisible(false)}
        onAddAction={() => setActionGeneratorVisible(false)}
      />
      <ResourceForm
        visible={formVisible}
        actionType="edit"
        resourceId={curResourceId}
        onCancel={() => setFormVisible(false)}
      />
    </>
  )
}

DashboardResources.displayName = "DashboardResources"
