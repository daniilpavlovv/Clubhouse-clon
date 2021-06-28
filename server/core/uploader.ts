import multer from 'multer'
import { nanoid } from 'nanoid'

export const uploader = multer({
  storage: multer.diskStorage({
    destination: (_, __, cb) => {
      cb(null, 'public/users_data/avatars')
    },
    filename: (_, file, cb) => {
      cb(null, 'av' + '_' + nanoid(10) + '.' + file.mimetype.split('/').pop())
    },
  }),
})
