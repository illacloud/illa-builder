import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const BAR_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "bar-progress-basic",
    groupName: "BASIC",
    children: [
      {
        id: "bar-progress-basic-Value",
        labelName: "Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-label",
    groupName: "LABEL",
    children: [
      {
        id: "bar-progress-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "bar-progress-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "bar-progress-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "bar-progress-label-alignment",
        labelName: "Alignment",
        attrName: "labelAlign",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "left",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "right",
          },
        ],
      },
      {
        id: "bar-progress-label-labelWidth",
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "bar-progress-adornments-showText",
        labelName: "Hidde value label",
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "bar-progress-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "bar-progress-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "bar-progress-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
        defaultValue: false,
      },
    ],
  },
  {
    id: "bar-progress-style",
    groupName: "STYLE",
    children: [
      {
        id: "bar-progress-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Styles",
        attrName: "styles",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "bar-progress-color",
            labelName: "Color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-trailColor",
            labelName: "Trail color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "bar-progress-strokeWidth",
            labelName: "Stroke width",
            setterType: "INPUT_SETTER",
            attrName: "strokeWidth",
            defaultValue: "4px",
          },
        ],
      },
    ],
  },
]
