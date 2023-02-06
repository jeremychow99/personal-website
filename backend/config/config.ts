import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
    PORT: number | undefined;
    REDIS_PORT: number | undefined;
    REDIS_HOST: string | undefined;
    MONGO_URL: string | undefined;
    GITHUB_TOKEN: string | undefined;
    JWT_SECRET: string | undefined;
}

interface Config {
    PORT: number;
    REDIS_PORT: number;
    REDIS_HOST: string
    MONGO_URL: string;
    GITHUB_TOKEN: string;
    JWT_SECRET: string
}

// Loading process.env as ENV interface

const getConfig = (): ENV => {
    return {
        PORT: Number(process.env.PORT),
        REDIS_PORT: Number(process.env.REDIS_PORT),
        REDIS_HOST: process.env.REDIS_HOST,
        MONGO_URL: process.env.MONGO_URL,
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        JWT_SECRET: process.env.JWT_SECRET,
    };
};

// Throwing an Error if any field was undefined we don't want our app to run if it can't connect to DB and ensure 
// that these fields are accessible. If all is good return it as Config which just removes the undefined from our  
// type definition.

const getSanitzedConfig = (config: ENV): Config => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in config.env`);
        }
    }
    return config as Config;
};

const config = getConfig();

const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;

