import { integer, pgTable, timestamp, unique } from 'drizzle-orm/pg-core';
import { users } from './users';
import { roles } from './roles';

// 用户-角色关系表
export const userRoles = pgTable(
  'user_roles',
  {
    userId: integer('user_id')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [unique().on(table.userId, table.roleId)],
);
