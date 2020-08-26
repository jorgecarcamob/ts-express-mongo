import { Request, Response, NextFunction, Router } from "express";
import { Error } from "mongoose";
import createError from "http-errors";
import User from "../models/User";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async getAllUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      next(error);
    }
  }

  private async getUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOne({ id });
      if (!user) {
        throw createError(404, "User does not exist.");
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(400, "Invalid user id"));
        return;
      }
      next(error);
    }
  }

  private async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = new User(req.body);
      await user.save();
      res.status(201).json(user);
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  }

  private async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      if (!user) {
        throw createError(404, "User does not exist.");
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error.CastError) {
        return next(createError(400, "Invalid user id"));
      }
      next(error);
    }
  }

  private async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const user = await User.findOneAndDelete({ id });
      if (!user) {
        throw createError(404, "User does not exist.");
      }
      res.status(200).json(user);
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(400, "Invalid user id"));
        return;
      }
      next(error);
    }
  }

  public routes() {
    this.router.get("/", this.getAllUser);
    this.router.get("/:id", this.getUser);
    this.router.post("/", this.createUser);
    this.router.put("/:id", this.updateUser);
    this.router.delete("/:id", this.deleteUser);
  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;
