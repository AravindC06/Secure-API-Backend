const { createLogger, format, transports } = require("winston");
const { combine, timestamp, json, colorize } = format;

const timestamps = () => {
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // YYYY-MM-DD
  const time = now.toLocaleTimeString("en-US", { hour12: false }); // HH:mm:ss
  return `Date :${date} / Time :${time}`;
};

const consoleFormat = format.combine(
  format.colorize(),
  format.printf(({ level, message }) => {
    const formattedTimestamp = timestamps();
    return `${formattedTimestamp} ${level}: ${message}`;
  })
);

const logger = createLogger({
  level: "info",
  format: combine(colorize(), timestamp(), json()),
  transports: [new transports.Console({ format: consoleFormat }), new transports.File({ filename: "logs/app.log" })],
});

module.exports = logger;
