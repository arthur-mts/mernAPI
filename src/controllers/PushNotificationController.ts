import { Request, Response } from 'express';

import HttpError, { HttpStatusCode } from '../exceptions/HttpError';
import AccountRepo from '../repository/AccountRepo';
import FirebaseService from '../services/FirebaseService';

export default class PushNotificatioController {
  static async execute(req: Request, res: Response) {
    const { name } = req?.params;

    if(!name) 
      throw new HttpError(HttpStatusCode.ERROR, 'Username is required');  

    const userExists = await AccountRepo.find(name);
    
    if(!userExists)
      throw new HttpError(HttpStatusCode.NOT_FOUND, 'Account not found');

    FirebaseService.messaging().sendToTopic('allApps', {notification: { title: 'MERN Challenge', body: `Notification from ${name}`,sound: 'default' }, data: { ola: 'mundo'}})
      .then(()=>console.log('Notification posted successfully'))
      .catch((e)=>console.error(`Error when sending notification: ${JSON.stringify(e)}`));

    return res.status(HttpStatusCode.SUCCESS).send();
  }
}
