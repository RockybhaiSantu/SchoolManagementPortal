import db from "../config/db.js";

export const ensureClassesTable = async () => {
  const sql = `CREATE TABLE IF NOT EXISTS classes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
  )`;
  await db.promise().query(sql);
};

export const seedClasses = async () => {
  await ensureClassesTable();
  const classes = Array.from({length:10}, (_,i)=>`Class ${i+1}`);
  for(const name of classes){
    try{
      await db.promise().query("INSERT IGNORE INTO classes (name) VALUES (?)",[name]);
    }catch(e){ console.warn('seed class', name, e.message); }
  }
};

export const getAllClasses = async (req,res)=>{
  try{
    const [rows]=await db.promise().query("SELECT * FROM classes ORDER BY id");
    res.json(rows);
  }catch(err){ console.error(err); res.status(500).json({message:"Error fetching classes"}); }
};

export const createClass = async (req,res)=>{
  const {name}=req.body;
  try{
    const [r]=await db.promise().query("INSERT INTO classes (name) VALUES (?)",[name]);
    res.status(201).json({id:r.insertId, name});
  }catch(err){ console.error(err); res.status(500).json({message:"Error creating class"}); }
};

export const deleteClass = async (req,res)=>{
  const {id}=req.params;
  try{ await db.promise().query("DELETE FROM classes WHERE id = ?", [id]); res.json({message:"Deleted"}); }
  catch(err){ console.error(err); res.status(500).json({message:"Error deleting class"}); }
};
