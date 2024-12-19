const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet');
const xssClean = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const morgan = require('morgan');
const compression = require('compression');
const authRoutes = require('./routes/authRoutes');
const logger = require('./utils/logger');
const corsOptions = require('./config/corsConfig');
const limiter = require('./config/rateLimiter');
const morganFormat = require('./middleware/logger');

dotenv.config();
const app = express();
connectDB();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(xssClean());
app.use(mongoSanitize());
app.use(compression());
app.use(morganFormat);
app.use(limiter);

app.use('/api/auth', authRoutes);
// app.use('/api/user', userRoutes);
// app.use('/api/admin', adminRoutes);
// app.use('/api', commonRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));