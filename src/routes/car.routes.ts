import { Router } from "express";
import { getCars, getCarById, createCar, updateCar, deleteCar } from "../controllers/CarController";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCarById)
router.post("/create", createCar);
console.log(createCar);

router.put("/:id", updateCar);
router.delete("/:id", deleteCar);

export default router;