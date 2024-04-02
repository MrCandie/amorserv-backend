"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});
const error_controller_1 = __importDefault(require("./controllers/error-controller"));
const app_error_1 = __importDefault(require("./utils/app-error"));
const auth_route_1 = __importDefault(require("./routes/auth-route"));
const category_route_1 = __importDefault(require("./routes/category-route"));
const book_route_1 = __importDefault(require("./routes/book-route"));
const app = (0, express_1.default)();
const corsOptions = {
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({ useTempFiles: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (req, res) => {
    res.send("<h1>WELCOME TO MILK</h1>");
});
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});
// routes here
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/category", category_route_1.default);
app.use("/api/v1/book", book_route_1.default);
app.all("*", (req, res, next) => {
    return next(new app_error_1.default(`Can't find ${req.originalUrl} on this server`, 500));
});
app.use(error_controller_1.default);
const db = process.env.DATABASE;
async function startServer() {
    const port = process.env.PORT || 8080;
    try {
        const response = await mongoose_1.default.connect(db);
        console.log("database connection successful");
        app.listen(port, () => {
            console.log(`app running on port ${port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
startServer();
