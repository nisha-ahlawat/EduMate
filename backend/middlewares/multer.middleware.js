const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Always write uploads to backend/media (cwd-independent).
const mediaDir = path.join(__dirname, "..", "media");

// Ensure the directory exists so uploads (and static serving) don't fail.
if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Create folder on-demand (covers deploys where filesystem may start empty).
        if (!fs.existsSync(mediaDir)) {
            fs.mkdirSync(mediaDir, { recursive: true });
        }
        cb(null, mediaDir); // Destination directory for storing files
    },
    filename: function (req, file, cb) {
        let filename = "";
        if (req.body?.type === "timetable") {
            filename = `Timetable_${req.body.semester}_Semester_${req.body.branch}.png`;
        } else if (req.body?.type === "profile") {
            if (req.body.enrollmentNo) {
                filename = `Student_Profile_${req.body.enrollmentNo}_Semester_${req.body.branch}.png`;
            } else {
                filename = `Faculty_Profile_${req.body.employeeId}.png`;
            }
        } else if (req.body?.type === "material") {
            filename = `${req.body.title}_Subject_${req.body.subject}.pdf`;
        } else if (req.body?.type === "notice") {
            filename = `Notice_${req.body.title}.pdf`;
            
        }
        cb(null, filename);
    }
});

const upload = multer({ storage: storage });

module.exports = upload;