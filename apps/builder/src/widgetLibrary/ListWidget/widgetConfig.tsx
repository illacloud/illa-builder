import { v4 } from "uuid"
import { ReactComponent as ListWidgetIcon } from "@/assets/widgetCover/list.svg"
import i18n from "@/i18n/config"
import { BasicContainerConfig } from "@/widgetLibrary/BasicContainer/BasicContainer"
import { BUTTON_WIDGET_CONFIG } from "@/widgetLibrary/ButtonWidget"
import { IMAGE_WIDGET_CONFIG } from "@/widgetLibrary/ImageWidget"
import { OVERFLOW_TYPE } from "@/widgetLibrary/ListWidget/interface"
import { TEXT_WIDGET_CONFIG } from "@/widgetLibrary/TextWidget"
import { RESIZE_DIRECTION, WidgetConfig } from "@/widgetLibrary/interface"

export const LIST_WIDGET_CONFIG: WidgetConfig = {
  type: "LIST_WIDGET",
  displayName: "list",
  widgetName: i18n.t("widget.list.name"),
  keywords: ["list", "列表"],
  icon: <ListWidgetIcon />,
  sessionType: "PRESENTATION",
  w: 32,
  h: 38,
  childrenNode: [
    {
      ...BasicContainerConfig,
      childrenNode: [
        {
          ...TEXT_WIDGET_CONFIG,
          w: 10,
          h: 10,
          x: 22,
          y: 0,
          defaults: {
            ...TEXT_WIDGET_CONFIG.defaults,
            value:
              "{{templateDisplayName.dataSources.map((currentItem) => ('## ' + currentItem.name))}}",
            $dynamicAttrPaths: ["value"],
          },
        },
        // {
        //   ...TEXT_WIDGET_CONFIG,
        //   w: 20,
        //   h: 4,
        //   x: 22,
        //   y: 10,
        //   defaults: {
        //     ...TEXT_WIDGET_CONFIG.defaults,
        //     value:
        //       "{{templateDisplayName.dataSources.map((currentItem) => (currentItem.email))}}",
        //     $dynamicAttrPaths: ["value"],
        //   },
        // },
        {
          ...IMAGE_WIDGET_CONFIG,
          w: 16,
          h: 15,
          x: 3,
          y: 1,
          defaults: {
            ...IMAGE_WIDGET_CONFIG.defaults,
            imageSrc:
              "{{templateDisplayName.dataSources.map((currentItem) => (currentItem.img))}}",
            $dynamicAttrPaths: ["imageSrc"],
            radius: "8px",
          },
        },
        {
          ...BUTTON_WIDGET_CONFIG,
          w: 17,
          h: 5,
          x: 47,
          y: 5,
          defaults: {
            ...BUTTON_WIDGET_CONFIG.defaults,
            text: "Show notification",
            events: [
              {
                actionType: "showNotification",
                id: v4(),
                eventType: "click",
                title:
                  "{{templateDisplayName.dataSources.map((currentItem) => (currentItem.name))}}",
                description:
                  "{{templateDisplayName.dataSources.map((currentItem) => (currentItem.email))}}",
                notificationType: "success",
              },
            ],
            $dynamicAttrPaths: ["events.0.title", "events.0.description"],
          },
        },
      ],
    },
  ],
  defaults: {
    overflowMethod: OVERFLOW_TYPE.SCROLL,
    pageSize: "{{6}}",
    itemBackGroundColor: "white",
    backgroundColor: "white",
    itemHeight: 146,
    selectedIndex: undefined,
    selectedItem: undefined,
    dataSources: `{{[
  {
    "name": "user1",
    "email": "user1@illasoft.com",
    "img": "https://cdn.dribbble.com/users/693674/screenshots/20021608/media/d12b3f2b117d71626f17ee2dfd48681f.png"
  },
  {
    "name": "user2",
    "email": "user2@illasoft.com",
    "img": "https://cdn.dribbble.com/users/693674/screenshots/20021608/media/d12b3f2b117d71626f17ee2dfd48681f.png"
  },
  {
    "name": "user3",
    "email": "user3@illasoft.com",
    "img": "https://cdn.dribbble.com/users/693674/screenshots/20021608/media/d12b3f2b117d71626f17ee2dfd48681f.png"
  }
]}}`,
    dynamicHeight: "fixed",
    resizeDirection: RESIZE_DIRECTION.ALL,
  },
}
