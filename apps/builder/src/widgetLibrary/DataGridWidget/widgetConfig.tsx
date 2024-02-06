import TableWidgetIcon from "@/assets/widgetCover/table.svg?react"
import i18n from "@/i18n/config"
import { generateCalcColumnConfig } from "@/page/App/components/InspectPanel/PanelSetters/DataGridSetter/ColumnSetter"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import { UNIQUE_ID_NAME } from "./constants"

const originData = [
  {
    id: 1,
    name: "Elvera Sleite",
    email: "hboshers50@narod.ru",
    type: "product manager",
    age: 30,
    paid: true,
  },
  {
    id: 2,
    name: "Richardo Durrett",
    email: "mhamsleyt@ask.com",
    type: "UX/UI",
    age: 18,
    paid: false,
  },
  {
    id: 3,
    name: "Ellwood Halsted",
    email: "amccardle5h@godaddy.com",
    type: "designer",
    age: 14,
    paid: true,
  },
  {
    id: 4,
    name: "Tyson Anersen",
    email: "hstrettell3c@list-manage.com",
    type: "UX/UI",
    age: 32,
    paid: true,
  },
  {
    id: 5,
    name: "Tobey Mordy",
    email: "gfraschetti54@independent.co.uk",
    type: "designer",
    age: 22,
    paid: true,
  },
  {
    id: 6,
    name: "Leena Stovine",
    email: "prawlingson4w@phoca.cz",
    type: "designer",
    age: 17,
    paid: false,
  },
  {
    id: 7,
    name: "Erinn Olenchenko",
    email: "cmeddows1q@aboutads.info",
    type: "UX/UI",
    age: 17,
    paid: false,
  },
  {
    id: 8,
    name: "Jilly Aldiss",
    email: "radamik2b@hubpages.com",
    type: "marketing",
    age: 22,
    paid: false,
  },
  {
    id: 9,
    name: "Erinn Reasce",
    email: "aduckeru@scribd.com",
    type: "designer",
    age: 24,
    paid: false,
  },
  {
    id: 10,
    name: "Sargent Guy",
    email: "jmaccafferky57@archive.org",
    type: "marketing",
    age: 19,
    paid: false,
  },
  {
    id: 11,
    name: "Gay Craiker",
    email: "ddurrett42@yahoo.com",
    type: ["UX/UI", "designer"],
    age: 27,
    paid: false,
  },
  {
    id: 12,
    name: "Piper Sorey",
    email: "dscanterburyx@topsy.com",
    type: "designer",
    age: 25,
    paid: true,
  },
  {
    id: 13,
    name: "Renato Benjefield",
    email: "dmayfield27@seattletimes.com",
    type: "marketing",
    age: 27,
    paid: true,
  },
  {
    id: 14,
    name: "Adelind Loache",
    email: "vhessel2w@sciencedirect.com",
    type: ["designer", "UX/UI"],
    age: 14,
    paid: true,
  },
  {
    id: 15,
    name: "Pepi Corssen",
    email: "bfifield2v@amazonaws.com",
    type: ["product manager", "designer"],
    age: 27,
    paid: false,
  },
]

export const DATA_GRID_WIDGET_CONFIG: WidgetConfig = {
  version: 0,
  type: "DATA_GRID_WIDGET",
  displayName: "dataGrid",
  widgetName: i18n.t("widget.data_grid.name"),
  icon: <TableWidgetIcon />,
  keywords: ["dataGrid", "数据表格", "table", "表格"],
  sessionType: "DATA",
  resizeDirection: RESIZE_DIRECTION.ALL,
  w: 18,
  h: 50,
  defaults: {
    dataSourceMode: "dynamic",
    excludeHiddenColumns: true,
    dataSourceJS: `{{${JSON.stringify(originData, null, "  ")}}}`,
    dataSource: [],
    enablePagination: false,
    sortOrder: "default",
    columns: Object.keys(originData[0])
      .map((key) => {
        return generateCalcColumnConfig(key, true, false)
      })
      .concat(generateCalcColumnConfig(UNIQUE_ID_NAME, true, false)),
  },
}
