import { FC } from "react"
import { LandingMenuItems } from "../interface"
import { Item } from "./items"

export const MobileMenuItems: FC<{
  itemList: LandingMenuItems[]
}> = ({ itemList }) => {
  return (
    <div>
      {itemList.map((item) =>
        item.hidden ? null : <Item key={item.path} item={item} />,
      )}
    </div>
  )
}
