import { RoomsSliceState } from './slices/roomsSlice'
import { UserSliceState } from './slices/userSlice'

export type RootState = {
  rooms: RoomsSliceState
  user: UserSliceState
}
