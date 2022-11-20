import type { RequestHandler } from "express";

const notFoundHandler: RequestHandler = (_req, res, _next) => {
  return res.status(404).send({ error: "Not found" });
};

export default notFoundHandler;
