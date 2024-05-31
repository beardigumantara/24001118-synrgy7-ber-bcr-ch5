import { Request, Response } from "express";
import { mUpload } from "../middlewares/multer";
import cloudinary from "../config/cloudinary";
import { getAllCars, getCarId, postCar, putCar, removeCar } from "../services/carsSevice";

export const getCars =  async (_req: Request, res: Response) => {
  const cars = await getAllCars();

  res.status(200).json({
    message: "Get all cars",
    cars,
  });
}

export const getCarById = async (req: Request, res: Response) => {
  try {
    const getId: number = Number(req.params.id);
    const car = await getCarId(getId);
    res.status(200).json({
      message: "Get specific car by id",
      car,
    });
  } catch (error) {
    res.status(404).json({
      message: "Data Not Found"
     });
  }
}

export const createCar = [mUpload.single('image'), async (req: Request, res: Response) => {
  try {
    const fileBase64 = req.file?.buffer.toString('base64');
    const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(file, {
      folder: 'bcr',
      use_filename: true,
    });
    const {name, price, start_rent, finish_rent, availability} = req.body;

    // Create a new car entry with the Cloudinary image URL
    const car = await postCar({
      name,
      price,
      image: result.url,
      start_rent,
      finish_rent,
      availability,
    });

    console.log({car});
    

    // Respond with the created car details
    res.status(201).json({
      message: "Car created successfully",
      car,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error creating car",
      error,
    });
  }
}];

export const updateCar = [mUpload.single('image'), async (req: Request, res: Response) => {
  try {
    const fileBase64 = req.file?.buffer.toString('base64');
    const file = `data:${req.file?.mimetype};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(file, {
      folder: 'bcr',
      use_filename: true,
    });
    const {name, price, start_rent, finish_rent, availability} = req.body;
    const getId: number = Number(req.params.id);
    
    const existingCar = await getCarId(getId);
    if (!existingCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    const car = await putCar(getId, {
      name,
      price,
      image: result.url,
      start_rent,
      finish_rent,
      availability,
    });
    
    res.status(200).json({
      message: "Update a car",
      car,
    });
  } catch (error) {
    res.status(400).json({
      message: "Error updating car",
      error,
    });
  }
}];

export const deleteCar = async (req: Request, res: Response) => {
  try {
    const getId: number = Number(req.params.id);
    const car = await removeCar(getId);
    res.status(202).json({
      message: "Delete a car",
      car,
    });
  } catch (error) {
    res.status(404).json({
      message: "Data Not Found"
    });
  }
}