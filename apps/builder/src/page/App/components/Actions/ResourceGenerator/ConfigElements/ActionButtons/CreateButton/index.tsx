import { FC } from "react"
import { useFormContext } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { Button } from "@illa-design/react"
import { CreateButtonProps } from "./interface"

export const CreateButton: FC<CreateButtonProps> = (props) => {
  const { formState } = useFormContext()
  const { t } = useTranslation()
  const { text = t("editor.action.form.btn.save_changes") } = props

  return (
    <Button
      colorScheme="techPurple"
      disabled={!formState.isValid}
      loading={formState.isSubmitting}
      type="submit"
    >
      {text}
    </Button>
  )
}
