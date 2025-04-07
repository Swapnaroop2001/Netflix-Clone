import express, { Request, Response } from "express";
import Show, { IShow } from "../models/Show";
import mongoose from "mongoose";

const router = express.Router();

// Validate MongoDB ObjectId
const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id);

// Get a specific show by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate if the provided ID is a valid ObjectId
  if (!isValidObjectId(id)) {
    res.status(400).json({ message: "Invalid show ID format" });
    return;
  }

  try {
    const show = await Show.findById(id);
    console.log("Show result:", show);
    if (!show) {
      res.status(404).json({ message: "Show not found" });
      return;
    }
    res.json(show);
  } catch (error) {
    console.error("Error fetching show:", error);
    res.status(500).json({ message: "Error fetching show", error });
  }
});

// Get all shows
router.get("/", async (req: Request, res: Response) => {
  try {
    const shows = await Show.find(); // Fetch all shows
    res.status(200).json(shows); // Respond with the fetched shows
  } catch (error) {
    console.error("Error fetching shows:", error);
    res.status(500).json({ message: "Error fetching shows", error });
  }
});

export default router;
