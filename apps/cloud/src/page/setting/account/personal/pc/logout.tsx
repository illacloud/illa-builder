import { FC, useState } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { onClickLogout } from "@/utils/auth"

const Logout: FC = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div>
      <Button
        colorScheme="red"
        variant="light"
        size="large"
        loading={isLoading}
        onClick={() => {
          setIsLoading(true)
          onClickLogout()
        }}
      >
        {t("profile.setting.logout")}
      </Button>
    </div>
  )
}

Logout.displayName = "Logout"

export default Logout
