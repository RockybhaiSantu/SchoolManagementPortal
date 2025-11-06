import db from "../config/db.js";

export const ensureTimetableTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS timetables (
    id INT AUTO_INCREMENT PRIMARY KEY,
    class_name VARCHAR(50),
    day VARCHAR(20),
    period INT,
    subject VARCHAR(100),
    teacher_id INT
  )`;
  await db.promise().query(sql);
};

export const getTimetable = async (req,res)=>{
  try{
    const cls = req.query.class || null;
    let q = "SELECT * FROM timetables";
    const params=[];
    if(cls){ q += " WHERE class_name = ?"; params.push(cls); }
    const [rows]=await db.promise().query(q, params);
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).json({message:"Error fetching timetable"}); }
};

export const addEntry = async (req,res)=>{
  const { class_name, day, period, subject, teacher_id } = req.body;
  try{
    const [r]=await db.promise().query("INSERT INTO timetables (class_name, day, period, subject, teacher_id) VALUES (?,?,?,?,?)",
      [class_name, day, period, subject, teacher_id]);
    res.status(201).json({id:r.insertId});
  }catch(err){ console.error(err); res.status(500).json({message:"Error adding entry"}); }
};

export const deleteEntry = async (req,res)=>{
  const { id } = req.params;
  try{ await db.promise().query("DELETE FROM timetables WHERE id = ?", [id]); res.json({message:"Deleted"}); }
  catch(err){ console.error(err); res.status(500).json({message:"Error deleting entry"}); }
};
