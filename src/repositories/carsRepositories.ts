import { CarsModel } from "../models/CarsModel";

export const get = () => {
  return CarsModel.query();
}

export const getById = (id: number) => {
  return CarsModel.query().findById(id).throwIfNotFound();
}

export const create = (car: any) => {
  return CarsModel.query().insert(car).returning("*");
}

export const update = (id: number, car: any) => {
  return CarsModel.query().findById(id).patch(car).returning("*");
}

export const deleteCar = (id: number) => {
  return CarsModel.query().deleteById(id).throwIfNotFound().returning("*");
}