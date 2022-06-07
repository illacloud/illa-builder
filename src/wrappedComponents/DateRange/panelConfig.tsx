import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const DATE_RANGE_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date-range-basic",
    groupName: "BASIC",
    children: [
      {
        id: "date-range-basic-start-date",
        attrName: "value",
        setterType: "DATE_RANGE_VALUE_SETTER",
        isFullWidth: true,
        labelName: "",
        useCustomLabel: true,
      },
      {
        id: "date-basic-Format",
        labelName: "Format",
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-start-placeholder",
        labelName: "Start placeholder",
        attrName: "startPlaceholder",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-end-placeholder",
        labelName: "End placeholder",
        attrName: "endPlaceholder",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-max-date",
        labelName: "Max date",
        attrName: "maxDate",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-basic-min-date",
        labelName: "Min date",
        attrName: "minDate",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-label",
    groupName: "LABEL",
    children: [
      {
        id: "date-range-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "date-range-label-alignment",
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
        id: "select-label-labelWidth",
        labelName: "Width(%)",
        attrName: "labelWidth",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-interaction",
    groupName: "INTERACTION",
    children: [
      // eventHandle @aoao
      {
        id: "date-range-interaction-loading",
        labelName: "Loading",
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-interaction-disabled",
        labelName: "Disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date-range-interaction-readonly",
        labelName: "Read only",
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-range-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "date-range-adornments-showClear",
        labelName: "Show clear button",
        attrName: "showClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "date-range-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "input-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "input-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "input-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
      },
      {
        id: "input-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "date-range-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "date-range-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "date-range-style",
    groupName: "STYLE",
    children: [
      {
        id: "date-range-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "date-range-style",
            labelName: "Theme color",
            setterType: "COLOR_SELECT_SETTER",
            attrName: "colorScheme",
            defaultValue: "blue",
            options: colorSchemeOptions,
          },
        ],
      },
    ],
  },
]
