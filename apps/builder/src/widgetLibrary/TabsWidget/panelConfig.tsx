import {
  HorizontalCenterIcon,
  HorizontalEndIcon,
  HorizontalStartIcon,
  VerticalCenterIcon,
  VerticalEndIcon,
  VerticalStartIcon,
} from "@illa-design/icon"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"
import i18n from "@/i18n/config"
import { ReactComponent as TextSizeIcon } from "@/assets/text-size-icon.svg"

const baseWidgetName = "text"
export const TABS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: `${baseWidgetName}-basic`,
    groupName: i18n.t("editor.inspect.setter_group.basic"),
    children: [
      {
        id: `${baseWidgetName}-basic-inputModal`,
        labelName: i18n.t("editor.inspect.setter_label.content"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.text_value"),
        attrName: "disableMarkdown",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Markdown", value: false },
          { label: i18n.t("widget.text.text_model"), value: true },
        ],
      },
      {
        id: `${baseWidgetName}-basic-value`,
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
        isSetterSingleRow: true,
      },
    ],
  },
  {
    id: `${baseWidgetName}-adornments`,
    groupName: i18n.t("editor.inspect.setter_group.adornments"),
    children: [
      {
        id: `${baseWidgetName}-adornments-startAdornment`,
        labelName: i18n.t("editor.inspect.setter_label.tooltip"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.tooltip"),
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: `${baseWidgetName}-layout`,
    groupName: i18n.t("editor.inspect.setter_group.layout"),
    children: [
      {
        id: `${baseWidgetName}-layout-col`,
        labelName: i18n.t("editor.inspect.setter_label.horizontal_alignment"),
        attrName: "horizontalAlign",
        setterType: "RADIO_GROUP_SETTER",
        isSetterSingleRow: true,
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "start",
          },
          {
            label: <HorizontalCenterIcon />,
            value: "center",
          },
          {
            label: <HorizontalEndIcon />,
            value: "end",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-row`,
        labelName: i18n.t("editor.inspect.setter_label.vertical_alignment"),
        setterType: "RADIO_GROUP_SETTER",
        attrName: "verticalAlign",
        isSetterSingleRow: true,
        options: [
          {
            label: <VerticalStartIcon />,
            value: "start",
          },
          {
            label: <VerticalCenterIcon />,
            value: "center",
          },
          {
            label: <VerticalEndIcon />,
            value: "end",
          },
        ],
      },
      {
        id: `${baseWidgetName}-layout-hidden`,
        labelName: i18n.t("editor.inspect.setter_label.hidden"),
        labelDesc: i18n.t("editor.inspect.setter_tooltip.hidden"),
        setterType: "DYNAMIC_SWITCH_SETTER",
        attrName: "hidden",
        useCustomLayout: true,
        openDynamic: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: `${baseWidgetName}-style`,
    groupName: i18n.t("editor.inspect.setter_group.style"),
    children: [
      {
        id: `${baseWidgetName}-style-color`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.colors"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-color`,
            labelName: i18n.t("editor.inspect.setter_label.text"),
            setterType: "COLOR_PICKER_SETTER",
            attrName: "colorScheme",
            defaultValue: "grayBlue",
          },
        ],
      },
      {
        id: `${baseWidgetName}-style-size`,
        setterType: "LIST_SETTER",
        labelName: i18n.t("editor.inspect.setter_label.styles"),
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: `${baseWidgetName}-style-text-size`,
            labelName: i18n.t("editor.inspect.setter_label.text_size"),
            setterType: "EDITABLE_INPUT_SETTER",
            attrName: "fs",
            icon: <TextSizeIcon />,
            defaultValue: "14px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
