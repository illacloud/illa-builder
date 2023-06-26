export const fixedPosition = (
  x: number,
  y: number,
  width: number,
  columns: number,
) => {
  return {
    x: x < 0 ? 0 : x + width > columns ? columns - width : x,
    y: y < 0 ? 0 : y,
  }
}
