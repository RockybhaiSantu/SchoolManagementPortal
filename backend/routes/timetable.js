import express from "express";
import { ensureTimetableTable, getTimetable, addEntry, deleteEntry } from "../controllers/timetableController.js";
const router = express.Router();

router.get("/", async (req,res)=>{ await ensureTimetableTable(); return getTimetable(req,res); });
router.post("/", async (req,res)=>{ await ensureTimetableTable(); return addEntry(req,res); });
router.delete("/:id", deleteEntry);

export default router;
