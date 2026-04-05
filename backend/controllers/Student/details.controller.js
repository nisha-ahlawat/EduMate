const studentDetails = require("../../models/Students/details.model.js")

const getDetails = async (req, res) => {
    try {
        let user = await studentDetails.find(req.body).populate('subjects');
        if (!user) {
            return res.status(400).json({ success: false, message: "No Student Found" });
        }
        const data = {
            success: true,
            message: "Student Details Found!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const addDetails = async (req, res) => {
    try {
        let user = await studentDetails.findOne({
            enrollmentNo: req.body.enrollmentNo,
        });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "Student With This Enrollment Already Exists",
            });
        }
        user = await studentDetails.create({ ...req.body, profile: req.file.filename });
        const data = {
            success: true,
            message: "Student Details Added!",
            user,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}


const updateDetails = async (req, res) => {
    try {
        let user;
        if (req.file) {
            user = await studentDetails.findByIdAndUpdate(req.params.id, { ...req.body, profile: req.file.filename });
        } else {
            user = await studentDetails.findByIdAndUpdate(req.params.id, req.body);
        }
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Updated Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const deleteDetails = async (req, res) => {
    let { id } = req.body;
    try {
        let user = await studentDetails.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No Student Found",
            });
        }
        const data = {
            success: true,
            message: "Deleted Successfull!",
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getCount = async (req, res) => {
    try {
        let user = await studentDetails.count(req.body);
        const data = {
            success: true,
            message: "Count Successfull!",
            user,
        };
        res.json(data);
    } catch (error) {
        res
            .status(500)
            .json({ success: false, message: "Internal Server Error", error });
    }
}
const assignSubjects = async (req, res) => {
    const { studentId, subjects } = req.body; // subjects is an array of subject IDs
    try {
        let student = await studentDetails.findById(studentId);
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found",
            });
        }
        console.log(studentId)
        console.log(subjects)

        student.subjects = subjects;
        await student.save();

        const data = {
            success: true,
            message: "Subjects Assigned!",
            student,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error hai " });
    }
}
const getStudentSubjects = async (req, res) => {
    console.log("h");
  
    const enrollmentNo  = req.params.enrollmentNo;
    console.log(enrollmentNo);
    
    try {
        let student = await studentDetails.findOne({ enrollmentNo }).populate('subjects');
        
        if (!student) {
            return res.status(400).json({
                success: false,
                message: "Student not found",
            });
        }

        const data = {
            success: true,
            message: "Subjects Retrieved!",
            subjects: student.subjects,
           
        };
        console.log(data)
        res.json(data);
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};





module.exports = { getDetails, addDetails, updateDetails, deleteDetails, getCount,assignSubjects,getStudentSubjects }