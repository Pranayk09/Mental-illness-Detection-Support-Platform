import express from "express";
import {
  getAllResources,
  getResourceById,
  seedResources
} from "../controller/resourceController.js";
import { verifyResourceAccess } from "../Middleware/authMiddleware.js";

const resourceRouter = express.Router();

resourceRouter.get("/", getAllResources);
resourceRouter.post("/seed", seedResources);
resourceRouter.get("/:id", verifyResourceAccess, getResourceById);

export default resourceRouter;
