import { Request, Response, NextFunction, Router } from "express";
import { Error } from "mongoose";
import createError from "http-errors";
import Client from "../models/Client";

class ClientRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  private async getAllClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const clients = await Client.find();
      res.status(200).json(clients);
    } catch (error) {
      next(error);
    }
  }

  private async getClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const client = await Client.findOne({ id });
      if (!client) {
        throw createError(404, "Client does not exist.");
      }
      res.status(200).json(client);
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(400, "Invalid client id"));
        return;
      }
      next(error);
    }
  }

  private async createClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const client = new Client(req.body);
      await client.save();
      res.status(201).json(client);
    } catch (error) {
      if (error.name === "ValidationError") {
        return next(createError(422, error.message));
      }
      next(error);
    }
  }

  private async updateClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const client = await Client.findOneAndUpdate({ id }, req.body, {
        new: true,
      });
      if (!client) {
        throw createError(404, "Client does not exist.");
      }
      res.status(200).json(client);
    } catch (error) {
      if (error instanceof Error.CastError) {
        return next(createError(400, "Invalid client id"));
      }
      next(error);
    }
  }

  private async deleteClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { id } = req.params;
      const client = await Client.findOneAndDelete({ id });
      if (!client) {
        throw createError(404, "Client does not exist.");
      }
      res.status(200).json(client);
    } catch (error) {
      if (error instanceof Error.CastError) {
        next(createError(400, "Invalid client id"));
        return;
      }
      next(error);
    }
  }

  public routes() {
    this.router.get("/", this.getAllClient);
    this.router.get("/:url", this.getClient);
    this.router.post("/", this.createClient);
    this.router.put("/:url", this.updateClient);
    this.router.delete("/:url", this.deleteClient);
  }
}

const clientRoutes = new ClientRoutes();
export default clientRoutes.router;
