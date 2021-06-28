import express from 'express'
import { Room } from '../../models'

class RoomController {
  async index(req: express.Request, res: express.Response) {
    try {
      const items = await Room.findAll()
      res.json(items)
    } catch (error) {
      res.status(500).json({ message: 'Rooms Not Found', error })
    }
  }

  async create(req: express.Request, res: express.Response) {
    try {
      const data = {
        title: req.body.title,
        type: req.body.type,
      }
      if (!data.title || !data.type) {
        return res.status(400).json({ message: 'Not Create, Empty Title or Type' })
      }
      const room = await Room.create(data)
      res.status(201).json(room)
    } catch (error) {
      res.status(500).json({ message: 'Not Found', error })
    }
  }

  async show(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: 'Invalid Room ID' })
      }

      const room = await Room.findByPk(roomId)

      if (!room) {
        return res.status(404).json({ message: 'Room Not Found' })
      }

      res.json(room)
    } catch (error) {
      res.status(500).json({ message: 'Not Found', error })
    }
  }

  async delete(req: express.Request, res: express.Response) {
    try {
      const roomId = req.params.id

      if (isNaN(Number(roomId))) {
        return res.status(404).json({ message: 'Invalid Room ID' })
      }

      await Room.destroy({ where: { id: roomId } })

      res.send()
    } catch (error) {
      res.status(500).json({ message: 'Not Found', error })
    }
  }
}

export default new RoomController()
