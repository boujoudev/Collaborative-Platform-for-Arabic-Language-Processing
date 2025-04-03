const pool = require("../configs/db");

const Course = { 
    getAllCourses: async () => {
        const result = await pool.query("SELECT * FROM courses ORDER BY course_id");
        return result.rows;
        
    },
       
  
};
