import { HorizontalEnd, HorizontalStart } from "@/wrappedComponents/svg"
import { colorSchemeOptions } from "@/wrappedComponents/colorSchemeOptions"
import { PanelConfig } from "@/page/App/components/InspectPanel/interface"

const OptionsStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}

export const DATE_TIME_PANEL_CONFIG: PanelConfig[] = [
  {
    id: "date_time-basic",
    groupName: "BASIC",
    children: [
      {
        id: "date_time-basic-DefaultValue",
        labelName: "Default value",
        attrName: "value",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-date-format",
        labelName: "Date format",
        attrName: "dateFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-placeholder",
        labelName: "Placeholder",
        attrName: "placeholder",
        isFullWidth: true,
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-max-date",
        labelName: "Max date",
        attrName: "maxDate",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-min-date",
        labelName: "Min date",
        attrName: "minDate",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-time-format",
        labelName: "Time format",
        attrName: "timeFormat",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-basic-minute-step",
        labelName: "Step size",
        attrName: "minuteStep",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date_time-label",
    groupName: "LABEL",
    children: [
      {
        id: "date_time-label-label",
        labelName: "Label",
        attrName: "label",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-label-caption",
        labelName: "Caption",
        attrName: "labelCaption",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-label-position",
        labelName: "Position",
        attrName: "labelPosition",
        setterType: "RADIO_GROUP_SETTER",
        options: [
          { label: "Left", value: "left" },
          { label: "Top", value: "top" },
        ],
      },
      {
        id: "date_time-label-alignment",
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
    id: "date_time-interaction",
    groupName: "INTERACTION",
    children: [
      // eventHandle @aoao
      {
        id: "date_time-interaction-loading",
        labelName: "Loading",
        labelDesc: "xxxxx",
        attrName: "loading",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-interaction-disabled",
        labelName: "Disabled",
        labelDesc: "xxxxx",
        attrName: "disabled",
        setterType: "INPUT_SETTER",
      },
      {
        id: "date_time-interaction-readonly",
        labelName: "Read only",
        labelDesc: "xxxxx",
        attrName: "readonly",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date_time-adornments",
    groupName: "ADORNMENTS",
    children: [
      {
        id: "date_time-adornments-showClear",
        labelName: "Show clear button",
        attrName: "showClear",
        useCustomLabel: true,
        setterType: "DYNAMIC_SWITCH_SETTER",
      },
      {
        id: "date_time-adornments-tooltip",
        labelName: "Tooltip",
        attrName: "tooltipText",
        setterType: "INPUT_SETTER",
      },
    ],
  },
  {
    id: "date-time-validation",
    groupName: "VALIDATION",
    children: [
      {
        id: "date-time-validation-required",
        labelName: "Required field",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "required",
      },
      {
        id: "date-time-validation-custom",
        labelName: "Custom rule",
        setterType: "INPUT_SETTER",
        attrName: "customRule",
      },
      {
        id: "date-time-validation-hide-message",
        labelName: "Hide validation message",
        setterType: "DYNAMIC_SWITCH_SETTER",
        useCustomLabel: true,
        attrName: "hideValidationMessage",
      },
    ],
  },
  {
    id: "date_time-layout",
    groupName: "LAYOUT",
    children: [
      {
        id: "date_time-layout-hidden",
        setterType: "INPUT_SETTER",
        labelName: "Hidden",
        attrName: "hidden",
      },
    ],
  },
  {
    id: "date_time-style",
    groupName: "STYLE",
    children: [
      {
        id: "date_time-style-list",
        setterType: "LIST_SETTER",
        isFullWidth: true,
        labelName: "Color",
        attrName: "color",
        useCustomLabel: true,
        childrenSetter: [
          {
            id: "date_time-style-bg",
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
