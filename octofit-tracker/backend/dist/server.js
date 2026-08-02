"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./config/database"));
const routes_1 = __importDefault(require("./routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
// Construir la URL pública para Codespaces cuando corresponda,
// usando explícitamente process.env.CODESPACE_NAME
const codespaceName = process.env.CODESPACE_NAME;
const publicUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : `http://localhost:${port}`;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(routes_1.default);
(0, database_1.default)();
// Bind explícito a 0.0.0.0 para que sea accesible desde Codespaces
app.listen(port, '0.0.0.0', () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API base URL: ${publicUrl}`);
});
