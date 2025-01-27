const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const xssClean = require("xss-clean");
const csrf = require("csurf");
const mongoSanitize = require("express-mongo-sanitize");
const morgan = require("morgan");
const compression = require("compression");
const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const logger = require("./utils/logger");
const corsOptions = require("./config/corsConfig");
const morganFormat = require("./middleware/logger");
const responseFormatter = require("./utils/responseFormatter");
const credentials = require("./middleware/credentials");

dotenv.config();
connectDB();
const app = express();

app.use(credentials);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());
app.use(morganFormat);

app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api', commonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
