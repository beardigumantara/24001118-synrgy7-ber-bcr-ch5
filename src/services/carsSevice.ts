import { get, getById, create, update, deleteCar } from "../repositories/carsRepositories";

export const getAllCars = () => {
  return get();
}

export const getCarId = (id: number) => {
  return getById(id);
}

export const postCar = (car: any) => {
  return create(car);
}

export const putCar = (id: number, car: any) => {
  return update(id, car);
}

export const removeCar = (id: number) => {
  return deleteCar(id);
}