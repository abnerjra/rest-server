import 'dotenv/config';
import * as env from 'env-var';

export const envConfig = {
    PORT: env.get('PORT').default(3000).asPortNumber(),
    PUBLIC_PATH: env.get('PUBLIC_PATH').default('public').asString(),
    POSTGRES_URL: env.get('POSTGRES_URL').asString(),
    POSTGRES_USER: env.get('POSTGRES_USER').asString(),
    POSTGRES_DB: env.get('POSTGRES_DB').asString(),
    POSTGRES_PORT: env.get('POSTGRES_PORT').asPortNumber(),
    POSTGRES_PASSWORD: env.get('POSTGRES_PASSWORD').asString(),
}