import { Request, Response } from 'express'

export default class HealthController{
  public readonly info = (_req: Request, res: Response) => {
    res.json({
      name: 'My Api Service Users-Taks',
      version: '1.0.0',
      creator:'Matias Valladares'
    })
  }

  public readonly ping = (_req: Request, res: Response) => {
    res.send('Server is running')
  }
}
