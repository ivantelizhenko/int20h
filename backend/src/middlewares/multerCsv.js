import csvParser from "csv-parser";
import multer from "multer";
import { Readable } from "stream";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const multerCsvMiddleware = (fieldName = "file") => {
  return (req, res, next) => {
    upload.single(fieldName)(req, res, (err) => {
      if (err) return next(err);

      if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
      }

      const results = [];
      const stream = Readable.from(req.file.buffer.toString());

      stream
        .pipe(csvParser())
        .on("data", (data) => results.push(data))
        .on("end", () => {
          req.csvData = results;
          next();
        })
        .on("error", (err) => {
          console.error("Error parsing CSV:", err);
          res.status(500).json({ error: "Error parsing CSV file" });
        });
    });
  };
};

export default multerCsvMiddleware;
