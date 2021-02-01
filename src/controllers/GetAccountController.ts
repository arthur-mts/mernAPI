import { Request, Response } from "express";
import HttpError, { HttpStatusCode } from "../exceptions/HttpError";
import AccountRepo from "../repository/AccountRepo";
import { createDynamicLink } from '../services/FirebaseService';
export default class GetAccountController {
  static async execute(req: Request, res: Response) {
    let { name } = req?.params;

    if(!name) 
      throw new HttpError(400, 'Name is required');

    name = name.toLowerCase();
    
    const account = await AccountRepo.find(name);

    const dynamicLink = await createDynamicLink(name);

    console.log(dynamicLink);

    return res.status(HttpStatusCode.SUCCESS).json({ account, dynamicLink: dynamicLink.shortLink });
  }

}
