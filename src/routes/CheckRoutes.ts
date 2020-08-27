import { Request, Response, NextFunction, Router } from "express";
import mongoose, { Error } from "mongoose";
import createError from "http-errors";

class CheckRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async getLiveness(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res.status(200).json({ STATUS: "UP" });
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(200, { STATUS: "DOWN" }));
        return;
      }
      next(error);
    }
  }

  private async getReadiness(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      res
        .status(200)
        .json({ STATUS: mongoose.connection.readyState === 1 ? "UP" : "DOWN" });
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(200, { STATUS: "DOWN" }));
        return;
      }
      next(error);
    }
  }

  public routes() {
    this.router.get("/liveness", this.getLiveness);
    this.router.get("/readiness", this.getReadiness);
  }
}

const checkRoutes = new CheckRoutes();
export default checkRoutes.router;
