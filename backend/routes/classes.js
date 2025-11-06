import express from "express";
import { ensureClassesTable, seedClasses, getAllClasses, createClass, deleteClass } from "../controllers/classesController.js";
const router = express.Router();

router.get("/", async (req,res)=>{ await ensureClassesTable(); await seedClasses(); return getAllClasses(req,res); });
router.post("/", async (req,res)=>{ await ensureClassesTable(); return createClass(req,res); });
router.delete("/:id", deleteClass);

export default router;
