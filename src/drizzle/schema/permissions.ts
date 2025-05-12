import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

// 权限表
export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  name: text('name').notNull().unique(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
