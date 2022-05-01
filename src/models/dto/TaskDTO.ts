export interface BaseTaskDTO {
  id?: number
  title: string
  content: string
  done: boolean
  
   
}

export interface TaskDTO extends BaseTaskDTO {
  id:number
  userId: number | null
}

export interface CreateTaskDTO extends BaseTaskDTO {
  
}

export interface UpdateTaskDTO extends Partial<BaseTaskDTO> {} // Partial transforma los atributos de la BASE que sean obligatorias a no obligatorias





