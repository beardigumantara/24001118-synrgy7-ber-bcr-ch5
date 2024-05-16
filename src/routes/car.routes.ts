import { Router, Request, Response } from "express";
import { cars } from "../__data_mocks__/cars";


const router = Router();

//GET All cars
router.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Get all cars",
    data: cars,

    // print all cars data

  });
});

// GET specific car by id
router.get("/:id", (req: Request, res: Response) => {
  const getId: number = Number(req.params.id);
  const carById = cars.find(({id}) => id === getId);
  res.status(200).json({
    message: "Get specific car by id",
    data: carById,
  });
})