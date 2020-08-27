import { Router } from "express";

class IndexRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  public routes() {
    this.router.get("/", (req, res) => {
      res.send("Hello World XD!");
    });
  }
}

const indexRoutes = new IndexRoutes();
export default indexRoutes.router;
