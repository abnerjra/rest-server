import { envConfig } from "./config/plugins/env.pluging"
import { Server } from "./presentation/server"

(async () => {
    main()
})()

function main() {
    const server = new Server({
        port: envConfig.PORT,
        publicPath: envConfig.PUBLIC_PATH
    })
    server.start()

}
