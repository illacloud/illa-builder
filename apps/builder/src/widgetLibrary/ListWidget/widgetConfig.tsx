import { ReactComponent as ListWidgetIcon } from "@/assets/widgetCover/list.svg"
import i18n from "@/i18n/config"
import { LIST_ITEM_MARGIN_TOP } from "@/page/App/components/ScaleSquare/constant/widget"
import { TEMPLATE_DISPLAYNAME_KEY } from "@/utils/generators/generateComponentNode"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { IMAGE_WIDGET_CONFIG } from "@/widgetLibrary/ImageWidget"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"
import { DEFAULT_LIST } from "./constants"
import { PAGINATION_TYPE } from "./interface"

export const LIST_WIDGET_CONFIG: WidgetConfig = {
  type: "LIST_WIDGET",
  displayName: "list",
  widgetName: i18n.t("widget.list.name"),
  keywords: ["list", "列表"],
  icon: <ListWidgetIcon />,
  sessionType: "CONTAINER",
  w: 13,
  h: 38,
  version: 1,
  childrenNode: [
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...IMAGE_WIDGET_CONFIG,
          w: 13,
          h: 22,
          x: 0,
          y: 1,
          defaults: {
            ...IMAGE_WIDGET_CONFIG.defaults,
            imageSrc: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => (currentItem.photo))}}`,
            $dynamicAttrPaths: ["imageSrc"],
            radius: "8px",
          },
        },
        {
          ...TEXT_WIDGET_CONFIG,
          w: 19,
          h: 9,
          x: 13,
          y: 1,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => ('### ' + currentItem.name))}}`,
            $dynamicAttrPaths: ["value"],
          },
        },
        {
          ...TEXT_WIDGET_CONFIG,
          w: 19,
          h: 4,
          x: 13,
          y: 10,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => (currentItem.company))}}`,
            $dynamicAttrPaths: ["value"],
          },
        },
        {
          ...TEXT_WIDGET_CONFIG,
          w: 19,
          h: 4,
          x: 13,
          y: 14,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => ( currentItem.title))}}`,
            $dynamicAttrPaths: ["value"],
          },
        },
        {
          ...TEXT_WIDGET_CONFIG,
          w: 19,
          h: 4,
          x: 13,
          y: 18,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value: `{{${TEMPLATE_DISPLAYNAME_KEY}.dataSources.map((currentItem) => (currentItem.email))}}`,
            $dynamicAttrPaths: ["value"],
          },
        },
      ],
    },
  ],
  defaults: {
    enablePagination: "{{true}}",
    enableServerSidePagination: false,
    pageSize: "{{10}}",
    itemGap: LIST_ITEM_MARGIN_TOP,
    paginationType: PAGINATION_TYPE.LIMIT_OFFSET_BASED,
    itemBackGroundColor: "white",
    themeColor: "blue",
    itemHeight: 205,
    selectedIndex: undefined,
    selectedItem: undefined,
    dataSources: `{{
  ${JSON.stringify(DEFAULT_LIST)}
}}`,
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
    page: 0,
    offset: 0,
    itemBorderRadius: "4px",
    itemShadow: "none",
    beforeCursor: undefined,
    afterCursor: undefined,
    totalRowCount: undefined,
    previousCursor: undefined,
    nextCursor: undefined,
    hasNextPage: undefined,
  },
}
