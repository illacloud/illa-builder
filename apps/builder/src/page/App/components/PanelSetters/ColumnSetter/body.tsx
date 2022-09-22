import { FC, useContext } from "react"
import { ColumnItem } from "./columnItem"
import { ColumnListSetterContext } from "./context/columnListContext"
import { EmptyBody } from "./empty"

export const ListBody: FC = () => {
  const { columnItems } = useContext(ColumnListSetterContext)

  if (!columnItems || !Array.isArray(columnItems) || columnItems.length === 0)
    return <EmptyBody />

  return (
    <>
      {columnItems.map((item, index) => {
        const { label, value, header, accessorKey, visible } = item
        return (
          <ColumnItem
            key={accessorKey}
            accessorKey={accessorKey}
            header={header}
            value={value}
            visible={visible}
            index={index}
          />
        )
      })}
    </>
  )
}
