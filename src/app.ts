import { envConfig } from "./config/plugins/env.pluging"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(async () => {
    main()
})()

function main() {
    const server = new Server({
        port: envConfig.PORT,
        publicPath: envConfig.PUBLIC_PATH,
        routes:AppRoutes.routes
    })
    server.start()

}
