import path from "path";
import dotenv from "dotenv";
dotenv.config({ path: path.resolve(__dirname, "./.env") });

interface ENV {
    MONGO_URI: string | undefined;
    JWT_SECRET: string | undefined;
    JWT_LIFETIME: string | undefined;
}

interface Config {
    MONGO_URI: string
    JWT_SECRET: string
    JWT_LIFETIME: string
}

const getConfig = (): ENV => {
    return {
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_LIFETIME: process.env.JWT_LIFETIME
    };
};

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
