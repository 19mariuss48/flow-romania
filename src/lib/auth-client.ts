import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: typeof window !== "undefined" 
        ? window.location.origin 
        : "https://flow-romania.vercel.app"
})

export const { useSession, signIn, signUp, signOut } = authClient;
