import { Request, Response } from "express";
import HttpError from "../exceptions/HttpError";
import AccountRepo from "../repository/AccountRepo";


export default class CreateAccountController {

  static async execute(req: Request, res: Response) {
    const { name } = req?.body;

    if(!name) 
      throw new HttpError(400, 'Name is required');
  
    await AccountRepo.store(String(name).toLowerCase());
  
    return res.status(200).send();
  }
}
