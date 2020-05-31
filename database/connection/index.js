import getConfig from "next/config";

const { db } = getConfig().publicRuntimeConfig;

export default db;
