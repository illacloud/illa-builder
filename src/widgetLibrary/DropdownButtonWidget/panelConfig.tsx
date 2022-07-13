import { HorizontalEndIcon, HorizontalStartIcon } from "@illa-design/icon"
import { colorSchemeOptions } from "@/widgetLibrary/PublicSector/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"
import { VALIDATION_TYPES } from "@/utils/validationFactory"

export const DROPDOWN_BUTTON_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "dropdown-button-basic",
    groupName: "editor.inspect.setter_group.basic",
    children: [
      {
        id: "dropdown-button-basic-Value",
        labelName: "editor.inspect.setter_label.value",
        attrName: "value",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "dropdown-button-label",
    groupName: "editor.inspect.setter_group.label",
    children: [
      {
        id: "dropdown-button-label-label",
        labelName: "editor.inspect.setter_label.label",
        attrName: "label",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "dropdown-button-label-caption",
        labelName: "editor.inspect.setter_label.caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
      {
        id: "dropdown-button-label-position",
        labelName: "editor.inspect.setter_label.label_position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "dropdown-button-label-alignment",
        labelName: "editor.inspect.setter_label.label_alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: <HorizontalStartIcon />,
            value: "left",
          },
          {
            label: <HorizontalEndIcon />,
            value: "right",
          },
        ],
      },
      {
        id: "dropdown-button-label-labelWidth",
        labelName: "editor.inspect.setter_label.label_width",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.NUMBER,
      },
    ],
  },
  {
    id: "dropdown-button-adornments",
    groupName: "editor.inspect.setter_group.adornments",
    children: [
      {
        id: "dropdown-button-adornments-showText",
        labelName: "editor.inspect.setter_label.hide_value_label",
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "dropdown-button-adornments-tooltip",
        labelName: "editor.inspect.setter_label.tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
        expectedType: VALIDATION_TYPES.STRING,
      },
    ],
  },
  {
    id: "dropdown-button-layout",
    groupName: "editor.inspect.setter_group.layout",
    children: [
      {
        id: "dropdown-button-layout-hidden",
        setterType: "DYNAMIC_SWITCH_SETTER",
        labelName: "editor.inspect.setter_label.hidden",
        attrName: "hidden",
        useCustomLayout: true,
        expectedType: VALIDATION_TYPES.BOOLEAN,
      },
    ],
  },
  {
    id: "dropdown-button-style",
    groupName: "editor.inspect.setter_group.style",
    children: [
      {
        id: "dropdown-button-style-list",
        setterType: "LIST_SETTER",
        labelName: "editor.inspect.setter_label.styles",
        attrName: "styles",
        useCustomLayout: true,
        childrenSetter: [
          {
            id: "dropdown-button-color",
            labelName: "editor.inspect.setter_label.styles",
            setterType: "COLOR_PICKER_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "dropdown-button-trailColor",
            labelName: "editor.inspect.setter_label.trail_color",
            setterType: "COLOR_PICKER_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "dropdown-button-strokeWidth",
            labelName: "editor.inspect.setter_label.stroke_width",
            setterType: "INPUT_SETTER",
            attrName: "strokeWidth",
            defaultValue: "4px",
            expectedType: VALIDATION_TYPES.STRING,
          },
        ],
      },
    ],
  },
]
