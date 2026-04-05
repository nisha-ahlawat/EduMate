const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { signAccessToken, signRefreshToken } = require("../utils/jwt");
const { refreshCookieOptions, clearRefreshCookieOptions } = require("../utils/refreshCookieOptions");
const Admin = require("../models/Admin/credential.model");
const Faculty = require("../models/Faculty/credential.model");
const Student = require("../models/Students/credential.model");

const roleToModel = {
  admin: Admin,
  faculty: Faculty,
  student: Student,
};

async function refreshHandler(req, res, role) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });
    const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    if (role && payload.role !== role) return res.status(403).json({ success: false, message: "Forbidden" });
    const Model = roleToModel[payload.role];
    const user = await Model.findById(payload.sub);
    if (!user) return res.status(401).json({ success: false, message: "Unauthorized" });
    const match = await bcrypt.compare(token, user.refreshTokenHash || "");
    if (!match) return res.status(401).json({ success: false, message: "Unauthorized" });
    // rotate refresh token
    user.tokenVersion += 1;
    const newPayload = { sub: user.id, loginid: user.loginid, role: user.role, tv: user.tokenVersion };
    const accessToken = signAccessToken(newPayload);
    const newRefreshToken = signRefreshToken(newPayload);
    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await user.save();
    res.cookie("refreshToken", newRefreshToken, refreshCookieOptions());
    return res.json({ success: true, accessToken, user: { id: user.id, loginid: user.loginid, role: user.role } });
  } catch (err) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }
}

async function logoutHandler(req, res, role) {
  try {
    const token = req.cookies && req.cookies.refreshToken;
    if (token) {
      try {
        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const Model = roleToModel[payload.role];
        const user = await Model.findById(payload.sub);
        if (user) {
          user.refreshTokenHash = null;
          user.tokenVersion += 1;
          await user.save();
        }
      } catch (_) {}
    }
    res.clearCookie("refreshToken", clearRefreshCookieOptions());
    return res.json({ success: true });
  } catch (err) {
    return res.status(500).json({ success: false });
  }
}

module.exports = { refreshHandler, logoutHandler };


