import type { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (_err, _req, res, _next) => {
  return res.status(500).json({ error: "internal server error ! ! !" });
};

export default errorHandler;
