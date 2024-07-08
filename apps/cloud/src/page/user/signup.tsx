import { FC, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { useNavigate } from "react-router-dom"
import { Button, Input, Select, Space } from "@illa-design/react"
import "./SignUpPage.css"

interface SignUpFields {
  nickname: string
  email: string
  password: string
  confirmPassword: string
  role: string
}

const SignUpPage: FC = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFields>()
  const [loading, setLoading] = useState(false)

  const onSubmit: SubmitHandler<SignUpFields> = async (data) => {
    setLoading(true)
    try {
      // Aqui você pode chamar a função para realizar o cadastro
      console.log(data)
      // Supondo que o cadastro foi bem-sucedido
      navigate("/login")
    } catch (error) {
      // Tratar erro
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const password = watch("password")

  return (
    <div className="signup-page-container">
      <h1 className="signup-title">Sign Up</h1>
      <div className="signup-form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Space direction="vertical" size="large">
            <div>
              <label>Nickname</label>
              <Input
                {...register("nickname", {
                  required: "Nickname required",
                })}
                onChange={(value) =>
                  register("nickname").onChange({ target: { value } })
                }
              />
              {errors.nickname && (
                <span style={{ color: "red" }}>{errors.nickname.message}</span>
              )}
            </div>

            <div>
              <label>e-mail</label>
              <Input
                type="email"
                {...register("email", {
                  required: "e-mail required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid e-mail",
                  },
                })}
                onChange={(value) =>
                  register("email").onChange({ target: { value } })
                }
              />
              {errors.email && (
                <span style={{ color: "red" }}>{errors.email.message}</span>
              )}
            </div>

            <div>
              <label>Password</label>
              <Input
                type="password"
                {...register("password", {
                  required: "Password required",
                  minLength: {
                    value: 6,
                    message:
                      "Password minimum length of six characters required",
                  },
                })}
                onChange={(value) =>
                  register("password").onChange({ target: { value } })
                }
              />
              {errors.password && (
                <span style={{ color: "red" }}>{errors.password.message}</span>
              )}
            </div>

            <div>
              <label>Password confirmation</label>
              <Input
                type="password"
                {...register("confirmPassword", {
                  required: "Password confirmation required",
                  validate: (value) =>
                    value === password ||
                    "Password and Password confirmation does not match",
                })}
                onChange={(value) =>
                  register("confirmPassword").onChange({ target: { value } })
                }
              />
              {errors.confirmPassword && (
                <span style={{ color: "red" }}>
                  {errors.confirmPassword.message}
                </span>
              )}
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
                {...register("role", {
                  required: "Role required",
                })}
                onChange={(value) =>
                  register("role").onChange({ target: { value } })
                }
              />
              {errors.role && (
                <span style={{ color: "red" }}>{errors.role.message}</span>
              )}
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
