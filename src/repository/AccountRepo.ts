import AccountModel, { AccountShape } from "../models/Account";

import { MongoError } from 'mongodb';
import HttpError, { HttpStatusCode } from '../exceptions/HttpError';

interface ListAccountsParams {
  limit: number;
  page: number;
}

export default class AccountRepo {

  static async list({limit, page}: ListAccountsParams) {
    const total : number = await AccountModel.count({});
    const accounts : AccountShape[] = await AccountModel.find({},null,{limit, skip: limit * (page - 1) });
    return {total, accounts};
  }

  static async find(accountName: string): Promise<AccountShape> {
    const account = await AccountModel.findOne({name: accountName});
    if(!account) {
      throw new HttpError(HttpStatusCode.NOT_FOUND, 'Account not found');
    }
    return account as AccountShape;
  }

  static async store(accountName: string) : Promise<void>{
    try {
      await AccountModel.create({name: accountName});
    }
    catch(err) {
      if(err instanceof MongoError && err.code === 11000)
        throw new HttpError(HttpStatusCode.CONFLICT, 'An account with that name alredy exists.');
      throw err;
    }
  }
}
