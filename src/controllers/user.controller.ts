import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { User } from '../entity/User'

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await getRepository(User).find()
  return res.json(users)
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id)
  const user = await getRepository(User).findOne(id)
  return res.json(user)
}

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  const newUser = getRepository(User).create(req.body)
  const results = await getRepository(User).save(newUser)
  return res.json(results)
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id)
  const user = await getRepository(User).findOne(id)
  if (user) {
    getRepository(User).merge(user, req.body)
    const result = await getRepository(User).save(user) 
    return res.json(result)
  }
  return res.json({msg: 'User not found'})
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const id = parseInt(req.params.id)
  const user = await getRepository(User).delete(id)
  return res.json(user)
}