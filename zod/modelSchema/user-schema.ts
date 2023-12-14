import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  password: z.string(),
  nickName: z.string(),
  avatar: z.string(),
  status: z.number().int(),
  role: z.number().int(),
  createdTime: z.coerce.date(),
  createdId: z.string().nullable(),
})

export type User = z.infer<typeof UserSchema>
