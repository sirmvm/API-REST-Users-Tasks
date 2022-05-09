//CRUD ===> GETALL, GETBYID, CREATE, UPDATE, DELETE

import { Request, Response } from 'express'
import { TaskDTO, UpdateTaskDTO, CreateTaskDTO } from '../models/dto/TaskDTO'

import { createTaskSchema, updateTaskSchema } from '../models/validators/taskSchemas'

import TaskRepository from '../models/repositories/TaskRepository'

import { UserTokenPayload } from '../models/dto/UserDTO'

export default class TaskController{

  public readonly getAll = async (req:Request, res:Response) => {
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    const done = req.query.done
    
    try {
      const tasks : TaskDTO[] = await repository.findAll()	
      res.json(tasks)

    } catch (error){
      console.log(error)
      res.status(500).json({message: 'Server error'})
    }
    
  }

  public readonly getById = async (req:Request, res:Response) => {
    const user = req.user as UserTokenPayload
    const {id} = req.params
    const repository = new TaskRepository(user.sub)
    
    
    try {
      const task = await repository.findById(parseInt(id))
      if(!task){
        res.status(404).send('Task not found')
        return
      }
      
      res.json(task)
    } catch (error) {
      console.log(error)
      res.status(500).send('Internal server error')

    }    

    
  }

  public readonly create = async (req:Request, res:Response) => {
    const task = req.body as CreateTaskDTO
    

    try {
      await createTaskSchema.validateAsync(task)
      
    } catch (error){
      res.status(400).json({
        message: error.message
      })
      return
    }
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    
    try {
      const newTask = await repository.create(task)    
    res.json(newTask)

    } catch (error){
      if(error.code === 'P2002'){
        res.status(409).json({error: "Task already exists"})
        return
      }
      console.log(error)
      res.status(500).json({message : 'Something went wrong'})
      
    }
  }
  
  public readonly update = async (req:Request, res:Response) => {
    const {id}=req.params
    const task = req.body as UpdateTaskDTO
    
    try {
      await updateTaskSchema.validateAsync(task)
      
    } catch(error){
      res.status(400).json({
        message: error.message
      })
      return
      
    }
    const user = req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    try {
      await repository.update(parseInt(id), task)
    
      res.json({message:'Task updated'})

    } catch (error){
      if(error.code === 'P2002'){
        res.status(409).json({error: "Task already exists"})
        return
      }
      console.log(error)
      res.status(500).json({message : 'Something went wrong'})
    }
  }

  public readonly delete = async (req:Request, res:Response) => {
    const user = req.user as UserTokenPayload
    const {id} = req.params
    const repository = new TaskRepository(user.sub)
    try {
      await repository.delete(parseInt(id))
    //res.sendStatus(204)
      res.json({message:'Task Deleted'});
    } catch (error){
      console.log(error)
      res.status(500).json({message : 'Something went wrong'})
    }
    
    
  }




}