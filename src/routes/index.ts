import { Router } from 'express';

import CreateAccountController from '../controllers/CreateAccountController';
import GetAccountController from '../controllers/GetAccountController';
import GetAllAccountsController from '../controllers/GetAllAccountsController';
import PushNotificatioController from '../controllers/PushNotificationController';

const routes = Router();

routes.post('/accounts', async (req, res) => (
    await CreateAccountController.execute(req, res)
  )
);

routes.get('/accounts', async (req, res) => (
  await GetAllAccountsController.execute(req, res)
  )
);

routes.get('/accounts/:name', async(req, res) => (
    await GetAccountController.execute(req, res)
  )
);

routes.post('/accounts/:name/notification', async (req, res) => (
  await PushNotificatioController.execute(req, res)
));

export default routes;
