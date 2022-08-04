import { createReactQueryHooks } from "@trpc/react"
import type { AppRouter } from "trpc/routers/_app"

export const trpc = createReactQueryHooks<AppRouter>()
