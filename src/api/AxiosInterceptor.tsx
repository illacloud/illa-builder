import { FC, useEffect } from "react"
import { AxiosResponse } from "axios"
import { useNavigate, useLocation } from "react-router-dom"
import { Api } from "./base"

export const AxiosInterceptor: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  useEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        navigate("/user/login", { replace: true, state: { from: location } })
      }

      return Promise.reject(error)
    }

    const interceptor = Api.addResponseInterceptor(
      resInterceptor,
      errInterceptor,
    )

    return () => Api.removeResponseInterceptor(interceptor)
  }, [location, navigate])

  return children
}

AxiosInterceptor.displayName = "AxiosInterceptor"
