import { CarsModel } from "../models/CarsModel";
import { Request, Response } from "express";
import { mUpload } from "../middlewares/multer";
import cloudinary from "../config/cloudinary";


export const getCars =  async (req: Request, res: Response) => {
  const cars = await CarsModel.query();

  res.status(200).json({
    message: "Get all cars",
    cars,
  });
}

export const getCarById = async (req: Request, res: Response) => {
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
    const car = await CarsModel.query().insert({
      name,
      price,
      image: result.url,
      start_rent,
      finish_rent,
      availability,
    }).returning("*");

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
    
    const existingCar = await CarsModel.query().findById(getId);
    if (!existingCar) {
      return res.status(404).json({ message: "Car not found" });
    }

    const car = await CarsModel.query().findById(getId).patch({
      name,
      price,
      image: result.url,
      start_rent,
      finish_rent,
      availability,
    }).returning("*");
    
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
    const car = await CarsModel.query().deleteById(getId).throwIfNotFound().returning("*");
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