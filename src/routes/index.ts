import { Express, Router } from "express";

import main from "./main";
const api_url: string = <string>process.env.API;

export async function useRouter(app: Express) {
  //version 1

  const router = Router();

  //test
  router.use("/main", main);

  //cycle
  //cycle routes

  //person
  //person routes

  //attendadce
  //attendadce routes

  app.use(api_url, router);
}