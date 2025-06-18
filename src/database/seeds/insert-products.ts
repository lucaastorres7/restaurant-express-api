import type { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("products").del();

  // Inserts seed entries
  await knex("products").insert([
    { name: "Cheeseburger", price: 34 },
    { name: "Cheese sandwich", price: 22 },
    { name: "Chicken burgers", price: 23 },
    { name: "Spicy chicken", price: 33 },
    { name: "Fruit Salad", price: 13 },
    { name: "Cocktails", price: 12 },
    { name: "Nuggets", price: 14 },
    { name: "Sandwich", price: 13 },
    { name: "French Fries", price: 15 },
    { name: "Milk Shake", price: 3 },
    { name: "Coffee", price: 5 },
  ]);
}
