import { User } from '../models/user';
import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import UnauthenticatedError from '../errors/unauthenticated';

const register = async (req: Request, res: Response) => {
  const user = await User.create({ ...req.body })
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token })


}

const login = async (req: Request, res: Response) => {

  const { name, password } = req.body

  if (!name || !password) {
    throw new Error('Please provide email and password')
  }

  const user = await User.findOne({ name })
  if (!user) {
    throw new UnauthenticatedError('Invalid Credentials')
  }

  const isPasswordCorrect = await user.comparePassword(password)
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Credentials')
  }
  const token = user.createJWT()
  res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
}

export {
  register,
  login
}