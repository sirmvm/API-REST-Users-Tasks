"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
// npm i jsonwebtoken --> installar
// npm i --save-dev @types/jsonwebtoken --> installar
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const secret = process.env.JWT_SECRET; // para que no pquede en el repositorio
if (!secret) {
    throw new Error('JWT_SECRET is not found in environment variables');
}
function generateToken(user) {
    return jsonwebtoken_1.default.sign({ sub: user.id, email: user.email }, secret, { expiresIn: '7d' });
}
exports.generateToken = generateToken;
function verifyToken(token) {
    const verified = jsonwebtoken_1.default.verify(token, secret);
    return verified;
}
exports.verifyToken = verifyToken;
