import { integer, pgTable, timestamp, unique } from 'drizzle-orm/pg-core';
import { roles } from './roles';
import { permissions } from './permissions';

// 角色-权限关系表
export const rolePermissions = pgTable(
  'role_permissions',
  {
    roleId: integer('role_id')
      .notNull()
      .references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: integer('permission_id')
      .notNull()
      .references(() => permissions.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [unique().on(table.roleId, table.permissionId)],
);
