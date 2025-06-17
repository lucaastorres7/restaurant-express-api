import knex from "knex";
import type { Knex } from "knex";
import config from "../../knexfile.js";

const knexInstance: Knex = knex(config);

export { knexInstance as knex };
