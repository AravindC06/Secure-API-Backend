const allowedOrigins = [
    // 'http://localhost:3000',
    'http://localhost:5173',
  ];
  
  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        return callback(null, true);
      } else {
        return callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
  
  module.exports = corsOptions;
  