import chalk from "chalk";
import { execSync } from "node:child_process";

const hexKey = execSync("./node_modules/@fastify/secure-session/genkey.js").toString("hex");

console.log(``);
console.log(`${chalk.magenta("swan-partner-frontend")}`);
console.log(`${chalk.white("---")}`);
console.log("you can paste the following key in the root .env file:");
console.log(``);
console.log(hexKey);
console.log(`${chalk.white("---")}`);

export {};