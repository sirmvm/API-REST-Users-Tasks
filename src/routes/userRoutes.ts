import { Router } from 'express'
import UserController from '../controllers/UserController'
import tokenValidator from '../middlewares/tokenValidator'

const taskRoutes = Router()
const controller = new UserController()

taskRoutes.get('/', tokenValidator(), controller.getAll)
taskRoutes.get('/:id', controller.getById)
taskRoutes.post('/', tokenValidator({adminOnly:true}), controller.create)
taskRoutes.put('/:id', tokenValidator(), controller.update)
taskRoutes.delete('/:id', tokenValidator(), controller.delete)


export default taskRoutes
