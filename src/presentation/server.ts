import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    publicPath: string;
    routes: Router
}

export class Server {
    private app = express();
    private readonly port: number
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options) {
        const { port, publicPath, routes } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {
        //* Middleware

        //*Public folder
        this.app.use(express.static(this.publicPath));

        //* Routes
        this.app.use(this.routes)

        this.app.get('/{*split}', (req, res) => {
            console.log(req.url);

            const indexPath = path.join(__dirname, `../../${this.publicPath}/index.html`);
            res.sendFile(indexPath);
            return
        });

        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}