import superjson from "superjson"
import { createRouter } from "../create-router"

export const appRouter = createRouter()
  .transformer(superjson)
  .query("healthz", {
    async resolve() {
      return "yay!"
    },
  })

export type AppRouter = typeof appRouter
