import { Model, ModelObject } from "objection";

export class CarsModel extends Model {
  id!: number;
  name!: string;
  price!: string;
  image!: string;
  start_rent!: Date;
  finish_rent!: Date;
  availability!: boolean;
  created_at!: Date;
  updated_at!: Date;

  static get tableName(){
   return "cars"
  }

  $beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

export type Cars = ModelObject<CarsModel>