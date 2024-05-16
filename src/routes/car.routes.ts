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