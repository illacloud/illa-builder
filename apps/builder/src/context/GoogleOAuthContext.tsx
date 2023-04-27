import { createContext } from "react"
import { GoogleSheetAuthStatus } from "@/redux/resource/googleSheetResource"

interface GoogleOAuthContextTypeProps {
  oAuthStatus: GoogleSheetAuthStatus
  setOAuthStatus: (status: GoogleSheetAuthStatus) => void
}

export const GoogleOAuthContext = createContext<GoogleOAuthContextTypeProps>(
  {} as GoogleOAuthContextTypeProps,
)
