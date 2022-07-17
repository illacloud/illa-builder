import { FC, useLayoutEffect } from "react"
import { AxiosResponse } from "axios"
import { useLocation, useNavigate } from "react-router-dom"
import { Api } from "./base"
import { removeLocalStorage } from "@/utils/storage"

export const AxiosInterceptor: FC<{ children: JSX.Element }> = ({
  children,
}) => {
  const location = useLocation()
  const navigate = useNavigate()
  useLayoutEffect(() => {
    const resInterceptor = (response: AxiosResponse) => {
      return response
    }

    const errInterceptor = (error: any) => {
      if (error.response.status === 401) {
        removeLocalStorage("token")
        navigate("/user/login", { replace: true, state: { from: location } })
      } else if (error.response.status === 403) {
        navigate(`/403`)
      } else if (error.response.status >= 500) {
        navigate(`/500`)
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
