import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.string("price", 10).notNullable();
    table.string("image", 255).notNullable();
    table.timestamp("start_rent").notNullable();
    table.timestamp("finish_rent").notNullable();
    table.boolean("availability").notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}

