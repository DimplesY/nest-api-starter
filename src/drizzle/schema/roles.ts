import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 角色表
export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(), // 如 admin, editor, guest
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
