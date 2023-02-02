import { FC } from "react"
import { useTranslation } from "react-i18next"
import { MenuOptionSetterProps } from "./interface"

export const MenuOptionSetter: FC<MenuOptionSetterProps> = (props) => {
  const { handleUpdateDsl } = props

  const { t } = useTranslation()

  return <div></div>
}

MenuOptionSetter.displayName = "MenuOptionSetter"
