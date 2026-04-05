const facultyCredential = require("../../models/Faculty/credential.model.js");
const bcrypt = require("bcryptjs");
const { signAccessToken, signRefreshToken } = require("../../utils/jwt");
const { refreshCookieOptions } = require("../../utils/refreshCookieOptions");

const loginHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await facultyCredential.findOne({ loginid });
        if (!user) {
            return res
                .status(400)
                .json({ success: false, message: "Wrong Credentials" });
        }
        if (!(await bcrypt.compare(password, user.password))) {
            return res
                .status(400)
                .json({ success: false, message: "Wrong Credentials" });
        }
        const payload = { sub: user.id, loginid: user.loginid, role: user.role, tv: user.tokenVersion };
        const accessToken = signAccessToken(payload);
        const refreshToken = signRefreshToken(payload);
        user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        await user.save();
        res.cookie("refreshToken", refreshToken, refreshCookieOptions());
        res.json({ success: true, accessToken, user: { id: user.id, loginid: user.loginid, role: user.role } });
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const registerHandler = async (req, res) => {
    let { loginid, password } = req.body;
    try {
        let user = await facultyCredential.findOne({ loginid });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "User With This LoginId Already Exists",
            });
        }
        const hashed = await bcrypt.hash(password, 10);
        user = await facultyCredential.create({ loginid, password: hashed, role: "faculty" });
        const data = {
            success: true,
            message: "Register Successfull!",
            loginid: user.loginid,
            id: user.id,
        };
        res.json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
const updateHandler = async (req, res) => {
    try {
        let user = await facultyCredential.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Exists!",
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

const deleteHandler = async (req, res) => {
    try {
        let user = await facultyCredential.findByIdAndDelete(req.params.id);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "No User Exists!",
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

module.exports = { loginHandler, registerHandler, updateHandler, deleteHandler }