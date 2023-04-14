import mongoose from "mongoose";
import debugLib from "debug";
import dotenv from "dotenv";
dotenv.config();

const debug = debugLib("api:serverr");
const { connect } = mongoose;

export default async (host, dbName) => {
  try {
    await connect(host, { dbName });
    debug("Database is connected", host, dbName);
    console.log(host);
    console.log(dbName);

    console.log("Database is now Connected", dbName);
  } catch (e) {
    console.error("failed connecting to mongodb server");
    console.error(e);
  }
};
