import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'

const UserLoginSchema = z.object({
  username: z
    .string()
    .max(255, { message: '用户名不能超过255个字符' })
    .min(1, { message: '用户名不能为空' }),
  password: z.string().min(1, { message: '密码不能为空' }),
})

export class UserLoginRequest extends createZodDto(UserLoginSchema) {}
