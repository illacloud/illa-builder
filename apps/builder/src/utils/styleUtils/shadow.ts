export const getShadowStyle = (
  shadowSize?: "none" | "small" | "medium" | "large",
) => {
  switch (shadowSize) {
    case "small": {
      return "0px 2px 8px rgba(0, 0, 0, 0.08);"
    }
    case "medium": {
      return "0px 4px 16px rgba(0, 0, 0, 0.08);"
    }
    case "large": {
      return "0px 8px 20px rgba(0, 0, 0, 0.12);"
    }
    case "none":
    default:
      return "unset"
  }
}
