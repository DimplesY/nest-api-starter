import { createZodDto } from 'nestjs-zod'
import { z } from 'zod'
import { hashSync } from 'bcrypt'

const UserCreateSchema = z.object({
  username: z
    .string()
    .max(255, { message: '用户名不能超过255个字符' })
    .min(1, { message: '用户名不能为空' }),
  password: z
    .string()
    .max(255, { message: '密码不能超过255个字符' })
    .min(1, { message: '密码不能为空' })
    .transform((value) => hashSync(value, 10)),
  nickName: z
    .string()
    .max(255, { message: '昵称不能超过255个字符' })
    .min(1, { message: '昵称不能为空' }),
  avatar: z.string().min(1, { message: '头像不能为空' }),
  status: z
    .number({
      invalid_type_error: '状态码必须是整数',
    })
    .int('状态码必须是整数'),
  role: z
    .number({
      invalid_type_error: '角色必须是整数',
    })
    .int('角色必须是整数'),
})

export class UserCreateRequest extends createZodDto(UserCreateSchema) {}
