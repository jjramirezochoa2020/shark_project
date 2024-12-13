import { Router } from 'express'
import { PolizaController } from '../controllers/polizas.js'

export const polizasRouter = Router()

polizasRouter.get('/', PolizaController.getAll)
polizasRouter.post('/', PolizaController.create)
polizasRouter.get('/:id', PolizaController.getById)
polizasRouter.delete('/:id', PolizaController.delete)
polizasRouter.patch('/:id', PolizaController.update)
