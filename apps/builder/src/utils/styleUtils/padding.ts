export const getPaddingShape = (containerPadding: string = "") => {
  const paddings = containerPadding?.split(" ")
  let paddingTop = 0
  let paddingBottom = 0
  let paddingLeft = 0
  let paddingRight = 0
  if (paddings.length === 1) {
    paddingTop = isNaN(Number(paddings[0])) ? 0 : Number(paddings[0])
    paddingBottom = paddingTop
    paddingLeft = paddingTop
    paddingRight = paddingTop
  }

  if (paddings.length === 4) {
    paddingTop = isNaN(Number(paddings[0])) ? 0 : Number(paddings[0])
    paddingBottom = isNaN(Number(paddings[2])) ? 0 : Number(paddings[2])
    paddingLeft = isNaN(Number(paddings[3])) ? 0 : Number(paddings[3])
    paddingRight = isNaN(Number(paddings[1])) ? 0 : Number(paddings[1])
  }

  return {
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  }
}
