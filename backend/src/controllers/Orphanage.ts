import { Request, Response} from 'express'
import * as Yup from 'yup'
import { getRepository } from 'typeorm';
import Orphanage from '../models/Orphanage';
import orphanageView from '../views/orphanages_view'

export default {
  async create(req: Request, res: Response){
    const {
      name,
      latitude,
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
    } = req.body

    const reqFiles = req.files as Express.Multer.File[];

    const images = reqFiles.map(image => {
      return{
        path: image.filename
      }
    })

    const data = {
      name,
      latitude,
      longitude, 
      about, 
      instructions, 
      opening_hours, 
      open_on_weekends,
      images
    } 

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required()
      }))
    })

    await schema.validate(data, {
      abortEarly: false,
    })

    const orphanagesRepository = getRepository(Orphanage);
  
    const orphanage = orphanagesRepository.create(data)
  
    await orphanagesRepository.save(orphanage);
  
    return res.status(201).json(orphanage);
  },
  async index(req: Request, res: Response){
    const orphanagesRepository = getRepository(Orphanage);
    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return res.json(orphanageView.renderMany(orphanages));
  },
  async show(req: Request, res:Response){
    const { id } = req.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne(id, {
      relations: ['images']
    })

    if(orphanage){
      return res.json(orphanageView.render(orphanage))

    }else{
      return res.status(401).json({ error: "Orphanage not found!"})
    }

  }
}