import { FC, useMemo, useState } from "react"
import { useSelector } from "react-redux"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
// TODO: @aruseito Abstract into tool function
import dayjs from "dayjs"
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"
import { Button } from "@illa-design/button"
import { Empty } from "@illa-design/empty"
import { Table } from "@illa-design/table"
import { MoreIcon } from "@illa-design/icon"
import { Message } from "@illa-design/message"
import { Dropdown } from "@illa-design/dropdown"
import { Resource, ResourceListState } from "@/redux/resource/resourceState"
import { selectAllResource } from "@/redux/resource/resourceSelector"
import { DashboardResourcesItemMenu } from "@/page/Dashboard/components/DashboardItemMenu/resourcesItemMenu"
import { ActionTypeIcon } from "@/page/App/components/ActionEditor/components/ActionTypeIcon"
import { DashboardGenerator } from "@/page/Dashboard/components/DashboardGenerator"
import { ActionType } from "@/page/Dashboard/components/DashboardGenerator/interface"
import {
  appsContainerStyle,
  listTitleContainerStyle,
  listTitleStyle,
  itemMenuButtonStyle,
  editButtonStyle,
} from "@/page/Dashboard/DashboardApps/style"
import {
  nameIconStyle,
  tableNormalTextStyle,
  tableMainTextStyle,
  tableInfoTextStyle,
  tableStyle,
} from "./style"
import { cloneDeep } from "lodash"
import { Divider } from "@illa-design/divider"

dayjs.extend(utc)
dayjs.extend(timezone)

function NameColComponent(type: string, text: string) {
  return (
    <>
      <ActionTypeIcon actionType={type} css={nameIconStyle} />
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
    return <span css={tableInfoTextStyle}>-</span>
  }
}
function CtimeColComponent(text: string) {
  const timezone = dayjs.tz.guess()
  return (
    <span css={tableInfoTextStyle}>
      {dayjs(text).tz(timezone).format("YYYY-MM-DD HH:mm:ss")}
    </span>
  )
}

const ExtraColComponent: FC<{
  resourceId: string
  showFormVisible: () => void
  setCurId: (curResourceId: string) => void
  editActionType: () => void
}> = (props) => {
  const { t } = useTranslation()
  const { resourceId, showFormVisible, setCurId, editActionType } = props
  return (
    <>
      <Button
        className="edit-button"
        _css={editButtonStyle}
        colorScheme="techPurple"
        onClick={() => {
          setCurId(resourceId)
          editActionType()
          showFormVisible()
        }}
        title="editButton"
      >
        {t("edit")}
      </Button>
      <Dropdown
        position="br"
        trigger="click"
        triggerProps={{ closeDelay: 0, openDelay: 0 }}
        dropList={
          <DashboardResourcesItemMenu
            resourceId={resourceId}
            setCurId={setCurId}
            showFormVisible={showFormVisible}
            editActionType={editActionType}
          />
        }
      >
        <Button
          _css={itemMenuButtonStyle}
          colorScheme="grayBlue"
          leftIcon={<MoreIcon size="14px" />}
        />
      </Dropdown>
    </>
  )
}

export const DashboardResources: FC = () => {
  const [dashboardGeneratorVisible, setDashboardGeneratorVisible] =
    useState(false)
  const [curResourceId, setCurResourceId] = useState<string>("")
  const [actionType, setActionType] = useState<ActionType>("new")

  const { t } = useTranslation()

  const resourcesList: ResourceListState = useSelector(selectAllResource)

  const showFromFunction = () => {
    setDashboardGeneratorVisible(true)
  }
  const changeCurResourceId = (curResourceId: string) => {
    setCurResourceId(curResourceId)
  }
  const editActionType = () => {
    setActionType("edit")
  }

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
    const tmpResourcesList = cloneDeep(resourcesList)
    tmpResourcesList
      .sort((a, b) => {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      })
      .forEach((item: Resource) => {
        result.push({
          nameCol: NameColComponent(item.resourceType, item.resourceName),
          typeCol: TypeColComponent(item.resourceType),
          dbNameCol: DbNameColComponent(item.options?.databaseName),
          ctimeCol: CtimeColComponent(item.updatedAt),
          extraCol: (
            <ExtraColComponent
              resourceId={item.resourceId}
              showFormVisible={() => showFromFunction()}
              setCurId={changeCurResourceId}
              editActionType={editActionType}
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
              setActionType("new")
              setDashboardGeneratorVisible(true)
            }}
          >
            {t("dashboard.resources.create_resources")}
          </Button>
        </div>
        <Divider direction="horizontal" />
        {resourcesList?.length ? (
          <Table
            _css={tableStyle}
            data={data}
            columns={columns}
            disableRowSelect
          />
        ) : null}
        {!resourcesList?.length ? <Empty paddingVertical="120px" /> : null}
      </div>
      <DashboardGenerator
        actionType={actionType}
        visible={dashboardGeneratorVisible}
        resourceId={curResourceId}
        onClose={() => {
          setDashboardGeneratorVisible(false)
        }}
        onSuccess={(type: ActionType) => {
          if (type === "new") {
            Message.success(t("dashboard.resources.create_success"))
          } else if (type === "edit") {
            Message.success(t("dashboard.resources.edit_success"))
          }
          setDashboardGeneratorVisible(false)
        }}
      />
    </>
  )
}

DashboardResources.displayName = "DashboardResources"
