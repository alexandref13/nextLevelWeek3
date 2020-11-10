import { Router } from 'express'
import multer from 'multer'

import Orphanage from './controllers/Orphanage';
import uploadConfig from './config/upload'

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/orphanages', upload.array('images'), Orphanage.create)
routes.get('/orphanages', Orphanage.index)
routes.get('/orphanages/:id', Orphanage.show)

export default routes;