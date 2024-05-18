import { Router, Request, Response } from "express";
import { cars } from "../__data_mocks__/cars";
import { CarsModel } from "../models/CarsModel";

const router = Router();

//GET All cars
router.get("/", async (req: Request, res: Response) => {
  const cars = await CarsModel.query();

  res.status(200).json({
    message: "Get all cars",
    cars,
  });
});

// GET specific car by id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const getId: number = Number(req.params.id);
    const car = await CarsModel.query().findById(Number(getId)).throwIfNotFound();
    res.status(200).json({
      message: "Get specific car by id",
      car,
    });
  } catch (error) {
    res.status(404).json({
      message: "Data Not Found"
     });
  }
})

// POST a car
router.post("/create", async (req: Request, res: Response) => {
  // try {
  //   const car = await CarsModel.query().insert(req.body).returning("*");
  //   res.status(201).json({
  //     message: "Post a car",
  //     car,
  //   });
  // } catch (error) {
  //   res.status(400).json({
  //     message: "Bad Request"
  //   });
  // }
  const car = await CarsModel.query().insert(req.body).returning("*");
    res.status(201).json({
      message: "Post a car",
      car,
    });
});

router.delete("/:id", async (req: Request, res: Response) => {
  const getId: number = Number(req.params.id);
  const car = await CarsModel.query().deleteById(getId).throwIfNotFound().returning("*");
  res.status(202).json({
    message: "Delete a car",
    car,
  });
});

export default router;