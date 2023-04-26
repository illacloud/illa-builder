import { v4 } from "uuid"

export const generateCellItemId = () => `cell-${v4()}`

export const generateNewButtonCellContent = (number: number) => {
  const id = generateCellItemId()
  return {
    label: `Button${number}`,
    cellValue: `Button${number}`,
    colorScheme: "blue",
    id,
    index: number - 1,
  }
}

export const generateNewIconCellContent = (number: number) => {
  const id = generateCellItemId()
  return {
    label: `Icon${number}`,
    cellValue: "BsHandThumbsUp",
    id,
    index: number - 1,
  }
}
