import express from 'express';
import path from 'path';

interface Options {
    port: number;
    publicPath: string;
}

export class Server {
    private app = express();
    private readonly port: number
    private readonly publicPath: string;

    constructor(options: Options) {
        const { port, publicPath } = options;
        this.port = port;
        this.publicPath = publicPath;
    }

    async start() {
        //* Middleware

        //*Public folder
        this.app.use(express.static(this.publicPath));

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