import { config } from 'dotenv';
import path from "path";
const __dirname = path.resolve();

config({ path: __dirname+ "/.env" });

const envHandler = (envName) => {
  const env = process.env[envName];
  if (!env) {
    console.error(`ENV ${envName} is not defined.`);
  }
  return env;
};

export default envHandler;

