import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import i18n from "@/i18n/config"

const baseWidgetName = "table"
export const TABLE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-data`,
    groupName: i18n.t("editor.inspect.setter_group.data"),
    children: [
      {
        id: `${baseWidgetName}-basic-data`,
        labelName: i18n.t("editor.inspect.setter_label.data"),
        attrName: "originData",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  // {
  //   id: `${baseWidgetName}-adornments`,
  //   groupName: i18n.t("editor.inspect.setter_group.adornments"),
  //   children: [
  //     {
  //       id: `${baseWidgetName}-adornments-startAdornment`,
  //       labelName: i18n.t("editor.inspect.setter_label.tooltip"),
  //       labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
  //       attrName: "tooltipText",
  //       setterType: "INPUT_SETTER",
  //       expectedType: VALIDATION_TYPES.STRING,
  //     },
  //   ],
  // },
  // {
  //   id: `${baseWidgetName}-layout`,
  //   groupName: i18n.t("editor.inspect.setter_group.layout"),
  //   children: [
  //     {
  //       id: `${baseWidgetName}-layout-col`,
  //       labelName: i18n.t("editor.inspect.setter_label.horizontal_alignment"),
  //       attrName: "horizontalAlign",
  //       setterType: "RADIO_GROUP_SETTER",
  //       isSetterSingleRow: true,
  //       options: [
  //         {
  //           label: <HorizontalStartIcon />,
  //           value: "start",
  //         },
  //         {
  //           label: <HorizontalCenterIcon />,
  //           value: "center",
  //         },
  //         {
  //           label: <HorizontalEndIcon />,
  //           value: "end",
  //         },
  //       ],
  //     },
  //     {
  //       id: `${baseWidgetName}-layout-row`,
  //       labelName: i18n.t("editor.inspect.setter_label.vertical_alignment"),
  //       setterType: "RADIO_GROUP_SETTER",
  //       attrName: "verticalAlign",
  //       isSetterSingleRow: true,
  //       options: [
  //         {
  //           label: <VerticalStartIcon />,
  //           value: "start",
  //         },
  //         {
  //           label: <VerticalCenterIcon />,
  //           value: "center",
  //         },
  //         {
  //           label: <VerticalEndIcon />,
  //           value: "end",
  //         },
  //       ],
  //     },
  //     {
  //       id: `${baseWidgetName}-layout-hidden`,
  //       labelName: i18n.t("editor.inspect.setter_label.hidden"),
  //       labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
  //       setterType: "DYNAMIC_SWITCH_SETTER",
  //       attrName: "hidden",
  //       useCustomLayout: true,
  //       expectedType: VALIDATION_TYPES.BOOLEAN,
  //     },
  //   ],
  // },
  // {
  //   id: `${baseWidgetName}-style`,
  //   groupName: i18n.t("editor.inspect.setter_group.style"),
  //   children: [
  //     {
  //       id: `${baseWidgetName}-style-list`,
  //       setterType: "LIST_SETTER",
  //       labelName: i18n.t("editor.inspect.setter_label.colors"),
  //       attrName: "styles",
  //       useCustomLayout: true,
  //       childrenSetter: [
  //         {
  //           id: `${baseWidgetName}-style-color`,
  //           labelName: i18n.t("editor.inspect.setter_label.text"),
  //           setterType: "COLOR_PICKER_SETTER",
  //           attrName: "textColor",
  //           defaultValue: "#787e85ff",
  //           options: colorSchemeOptions,
  //         },
  //         {
  //           id: `${baseWidgetName}-style-link-color`,
  //           labelName: i18n.t("editor.inspect.setter_label.links_color"),
  //           setterType: "COLOR_PICKER_SETTER",
  //           attrName: "linkColor",
  //           defaultValue: "#1e6fffff",
  //           options: colorSchemeOptions,
  //         },
  //       ],
  //     },
  //   ],
  // },
]
