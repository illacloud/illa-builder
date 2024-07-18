import { setAuthToken } from "@illa-public/utils"
import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Input, Select, Space } from "@illa-design/react"
import { useMessage } from "@illa-design/react"
import { fetchSignUp } from "@/services/auth"
import "./SignUpPage.css"

interface SignUpFields {
  nickname: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

const SignUpPage: FC = () => {
  const message = useMessage()
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { register, handleSubmit, setValue } = useForm<SignUpFields>()
  const [loading, setLoading] = useState(false)

  const roleToNumber = (role: string): number => {
    switch (role) {
      case "OWNER":
        return 1
      case "ADMIN":
        return 2
      case "EDITOR":
        return 3
      case "VIEWER":
        return 4
      case "OBSERVER":
        return 5
      default:
        return 0 // ou algum valor padrão ou erro
    }
  }

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    setLoading(true)
    try {
      console.log(data)

      // Convertendo a role para número
      const formattedData = {
        ...data,
        role: roleToNumber(data.role),
      }

      const response = await fetchSignUp(formattedData)
      const token = response.headers["illa-token"]
      if (!token) return
      setAuthToken(token)
      message.success({
        content: t("page.user.sign_up.tips.success"),
      })
      navigate("/login")
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = (value?: string | undefined) => {
    if (value) {
      setValue("role", value)
    }
  }

  return (
    <div className="signup-page-container">
      <h1 className="signup-title">Sign Up</h1>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="large">
            <div>
              <label>Nickname</label>
              <Input
                {...register("nickname")}
                onChange={(value) =>
                  register("nickname").onChange({ target: { value } })
                }
              />
            </div>

            <div>
              <label>e-mail</label>
              <Input
                type="email"
                {...register("email")}
                onChange={(value) =>
                  register("email").onChange({ target: { value } })
                }
              />
            </div>

            <div>
              <label>Password</label>
              <Input
                type="password"
                {...register("password")}
                onChange={(value) => ({ target: { value } })}
              />
            </div>

            <div>
              <label>Password confirmation</label>
              <Input
                type="password"
                {...register("confirmPassword")}
                onChange={(value) => ({ target: { value } })}
              />
            </div>

            <div>
              <label>Role</label>
              <Select
                options={[
                  { label: "OWNER", value: "OWNER" },
                  { label: "ADMIN", value: "ADMIN" },
                  { label: "EDITOR", value: "EDITOR" },
                  { label: "VIEWER", value: "VIEWER" },
                  { label: "OBSERVER", value: "OBSERVER" },
                ]}
                onChange={(value) => handleRoleChange(value as string)}
              />
            </div>

            <div className="button-container">
              <Button type="submit" loading={loading}>
                Register
              </Button>
            </div>
          </Space>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
