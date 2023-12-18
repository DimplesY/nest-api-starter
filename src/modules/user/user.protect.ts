import { z } from 'zod'

import { UserSchema } from '@model/modelSchema/user-schema'
import { createProjectionOmit } from '~/shared/utils/schema.util'

export const UserSchemaSerializeProjection = createProjectionOmit(
  UserSchema.shape,
  ['password'],
)

export type UserSchema = z.infer<typeof UserSchema>
