import {
  HorizontalCenter,
  HorizontalEnd,
  HorizontalStart,
} from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const CIRCLE_PROGRESS_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "circle-progress-basic",
    groupName: "BASIC",
    children: [
      {
        id: "circle-progress-basic-Value",
        labelName: "Value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "circle-progress-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "circle-progress-adornments-showText",
        labelName: "Hidde value label",
        attrName: "showText",
        setterType: "SWITCH_SETTER",
      },
      {
        id: "circle-progress-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "circle-progress-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "circle-progress-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
        defaultValue: false,
      },
      {
        id: "circle-progress-layout-alignment",
        setterType: "RADIO_GROUP_SETTER",
        labelName: "Alignment",
        attrName: "alignment",
        options: [
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalStart />
              </div>
            ),
            value: "start",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalCenter />
              </div>
            ),
            value: "center",
          },
          {
            label: (
              <div style={OptionsStyle}>
                <HorizontalEnd />
              </div>
            ),
            value: "end",
          },
        ],
      },
    ],
  },
  {
    id: "circle-progress-style",
    groupName: "STYLE",
    children: [
      {
        id: "circle-progress-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Styles",
        attrName: "styles",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "circle-progress-color",
            labelName: "Color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "color",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
          {
            id: "circle-progress-trailColor",
            labelName: "Trail color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "trailColor",
            defaultValue: "gray",
            options: colorSchemeOptions,
          },
          {
            id: "circle-progress-strokeWidth",
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
