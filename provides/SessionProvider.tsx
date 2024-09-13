import {createContext, PropsWithChildren} from "react";
import {useStorageState} from "@/hooks/useStorageState";

export type AuthContextType = {
  signIn: (value: string) => void
  signOut: () => void
  session?: string | null
  isLoading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false
})

export function SessionProvider({children}: PropsWithChildren) {
  const [{isLoading, state}, setSession] = useStorageState('token');
  return(
    <AuthContext.Provider
      value={{
        signIn: (value: string) => {
          // Perform sign-in logic here
          setSession(value);
        },
        signOut: () => {
          setSession(null);
        },
        session: state,
        isLoading: isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  )
}