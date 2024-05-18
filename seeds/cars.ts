import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  // Inserts seed entries
  await knex("cars").insert([
    {
      name: "Toyota",
      price: "Rp700.000",
      image: "https://images.bisnis.com/thumb/posts/2019/03/31/906567/supra-baru.jpg?w=450&h=237",
      start_rent: new Date("2024-05-18 15:56:00"),
      finish_rent: new Date("2024-05-18 15:56:00"),
      availability: true,
    },
    {
        name: "Subaru",
        price: "Rp900.000",
        image: "https://images.bisnis.com/thumb/posts/2019/03/31/906567/supra-baru.jpg?w=450&h=237",
        start_rent: new Date("2024-05-18 15:56:00"),
        finish_rent: new Date("2024-05-18 15:56:00"),
        availability: true,
      },
      {
        name: "Daihatsu",
        price: "Rp200.000",
        image: "https://media.suara.com/pictures/653x366/2022/09/03/54583-ilustrasi-daihatsu-sigra.jpg",
        start_rent: new Date("2024-05-18 15:56:00"),
        finish_rent: new Date("2024-05-18 15:56:00"),
        availability: true,
      },
  ]);
}
