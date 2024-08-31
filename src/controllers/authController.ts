import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import User from '../models/User'
import { SortOrder } from 'mongoose'
import { sendResponse } from '../utils/response'

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body
  const user = await User.findOne({ username })

  if (!user || !await bcrypt.compare(password, user.password)) {
    return res.status(401).json({ message: 'Invalid credentials' })
  }

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
    expiresIn: '1h',
  })

  res.json({ token })
}

export const register = async (req: Request, res: Response) => {
  const { username, password, role } = req.body
  const hashedPassword = await bcrypt.hash(password, 10)

  try {
    const user = new User({ username, password: hashedPassword, role })
    await user.save()
    res.status(201).json({ message: 'User created successfully' })
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
}
export const getUsers = async (req: Request, res: Response) => {
  const { page, limit, sort, filter, search } = req.query

  // Pagination
  const pageNumber = parseInt(page as string) || 1
  const pageSize = parseInt(limit as string) || 10
  const skip = (pageNumber - 1) * pageSize

  // Sorting
  const sortField = sort as string
  const sortDirection = sortField.startsWith('-') ? -1 : 1
  const sortOptions: [string, SortOrder][] = [[sortField.replace(/^-/, ''), sortDirection]];

  // Filtering
  const filterOptions = filter as Record<string, any>

  // Searching
  const searchKeyword = search as string
  const searchOptions = searchKeyword ? { $text: { $search: searchKeyword } } : {}

  try {
    const users = await User.find({ ...filterOptions, ...searchOptions })
      .sort(sortOptions)
      .skip(skip)
      .limit(pageSize)

    const totalUsers = await User.countDocuments({ ...filterOptions, ...searchOptions })

    res.json({
      users,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalUsers / pageSize),
      totalUsers,
    })
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' })
  }
}