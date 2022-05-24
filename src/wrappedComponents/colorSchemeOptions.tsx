import { globalColor, illaPrefix } from "@illa-design/theme"

const bgOptionWrapperStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  height: "100%",
}

const colorBlockStyle = (backgroundColor: string) => {
  return {
    width: "18px",
    height: "18px",
    borderRadius: "4px",
    backgroundColor,
  }
}

// TODO: wait a color options builder
export const colorSchemeOptions = [
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-blue-01`))} />
        <span>{globalColor(`--${illaPrefix}-blue-01`)}</span>
      </div>
    ),
    value: "blue",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-white-01`))} />
        <span>{globalColor(`--${illaPrefix}-white-01`)}</span>
      </div>
    ),
    value: "white",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-gray-01`))} />
        <span>{globalColor(`--${illaPrefix}-gray-01`)}</span>
      </div>
    ),
    value: "gray",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-red-01`))} />
        <span>{globalColor(`--${illaPrefix}-red-01`)}</span>
      </div>
    ),
    value: "red",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div
          style={colorBlockStyle(globalColor(`--${illaPrefix}-orange-01`))}
        />
        <span>{globalColor(`--${illaPrefix}-orange-01`)}</span>
      </div>
    ),
    value: "orange",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div
          style={colorBlockStyle(globalColor(`--${illaPrefix}-yellow-01`))}
        />
        <span>{globalColor(`--${illaPrefix}-yellow-01`)}</span>
      </div>
    ),
    value: "yellow",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-green-01`))} />
        <span>{globalColor(`--${illaPrefix}-green-01`)}</span>
      </div>
    ),
    value: "green",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div style={colorBlockStyle(globalColor(`--${illaPrefix}-cyan-01`))} />
        <span>{globalColor(`--${illaPrefix}-cyan-01`)}</span>
      </div>
    ),
    value: "cyan",
  },
  {
    label: (
      <div style={bgOptionWrapperStyle}>
        <div
          style={colorBlockStyle(globalColor(`--${illaPrefix}-purple-01`))}
        />
        <span>{globalColor(`--${illaPrefix}-purple-01`)}</span>
      </div>
    ),
    value: "purple",
  },
]
