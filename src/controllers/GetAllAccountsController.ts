import { Request, Response } from "express";
import { HttpStatusCode } from "../exceptions/HttpError";
import AccountRepo from "../repository/AccountRepo";

export default class GetAllAccountsController {
  static async execute(req: Request, res: Response) {
    const limit = Number(req.query.limit || 10);
    const page = Number(req.query.page || 1);
    const { total, accounts } = await AccountRepo.list({limit, page});
    return res.status(HttpStatusCode.SUCCESS).json({page, limit, total, pages: Math.floor(total/limit) + 1, accounts});
  }
}
