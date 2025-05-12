import { relations } from 'drizzle-orm';
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { userRoles } from './user-roles';
import { rolePermissions } from './role-permissions';

// 角色表
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // 如 admin, editor, guest
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
}));
