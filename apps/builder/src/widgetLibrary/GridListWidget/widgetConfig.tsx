import { PADDING_MODE } from "@illa-public/public-types"
import GridListWidgetIcon from "@/assets/widgetCover/gridList.svg?react"
import i18n from "@/i18n/config"
import { TEMPLATE_DISPLAYNAME_KEY } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { IMAGE_WIDGET_CONFIG } from "@/widgetLibrary/ImageWidget"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import { DEFAULT_LIST } from "./constants"
import { COLUMN_NUM_ADAPTATION, PAGINATION_TYPE } from "./interface"

export const GRID_LIST_WIDGET_CONFIG: WidgetConfig = {
  type: "GRID_LIST_WIDGET",
  displayName: "gridList",
  widgetName: i18n.t("widget.grid_list.name"),
  keywords: ["gridList", "网格列表"],
  icon: <GridListWidgetIcon />,
  sessionType: "CONTAINER",
  w: 20,
  h: 55,
  version: 0,
  childrenNode: [
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...IMAGE_WIDGET_CONFIG,
          w: 32,
          h: 17,
          x: 0,
          y: 1,
          defaults: {
            ...IMAGE_WIDGET_CONFIG.defaults,
            imageSrc: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => (currentItem.photo))}}`,
            $dynamicAttrPaths: ["imageSrc"],
            radius: "4px",
          },
        },
        {
          ...TEXT_WIDGET_CONFIG,
          w: 32,
          h: 9,
          x: 0,
          y: 18,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => ('### ' + currentItem.name))}}`,
            $dynamicAttrPaths: ["value"],
          },
        },
      ],
    },
  ],
  defaults: {
    enablePagination: true,
    enableServerSidePagination: false,
    pageSize: "{{10}}",
    paginationType: PAGINATION_TYPE.LIMIT_OFFSET_BASED,
    itemBackGroundColor: "white",
    themeColor: "blue",
    itemHeight: 232,
    selectedIndex: undefined,
    selectedItem: undefined,
    dataSources: `{{
      ${JSON.stringify(DEFAULT_LIST)}
    }}`,
    columnNumAdaptation: COLUMN_NUM_ADAPTATION.FIXED,
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
    numberOfColumns: "{{3}}",
    minColumnWidth: "{{240}}",
    page: "{{0}}",
    offset: 0,
    itemBorderRadius: "4px",
    itemShadow: "medium",
    itemPadding: {
      mode: PADDING_MODE.ALL,
      size: "4",
    },
    beforeCursor: undefined,
    afterCursor: undefined,
    totalRowCount: undefined,
    previousCursor: undefined,
    nextCursor: undefined,
    hasNextPage: undefined,
  },
}
