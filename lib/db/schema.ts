import { relations, type InferModel } from 'drizzle-orm'
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core'

// Enums
export const userRoleEnum = pgEnum('user_role', ['customer', 'cleaner', 'admin'])
export const bookingStatusEnum = pgEnum('booking_status', [
  'pending',
  'confirmed',
  'completed',
  'cancelled',
])

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  role: userRoleEnum('role').notNull().default('customer'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Profiles table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => users.id),
  firstName: text('first_name'),
  lastName: text('last_name'),
  phone: text('phone'),
  address: text('address'),
  city: text('city'),
  state: text('state'),
  postcode: text('postcode'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Bookings table
export const bookings = pgTable('bookings', {
  id: uuid('id').primaryKey().defaultRandom(),
  customerId: uuid('customer_id')
    .notNull()
    .references(() => users.id),
  cleanerId: uuid('cleaner_id').references(() => users.id),
  status: bookingStatusEnum('status').notNull().default('pending'),
  serviceType: text('service_type').notNull(),
  date: timestamp('date').notNull(),
  duration: integer('duration').notNull(),
  price: integer('price').notNull(),
  address: text('address').notNull(),
  notes: text('notes'),
  metadata: jsonb('metadata').$type<Record<string, unknown>>(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Config table for storing site configuration
export const config = pgTable('config', {
  key: text('key').primaryKey(),
  value: jsonb('value').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
})

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.id],
  }),
  customerBookings: many(bookings, {
    fields: [users.id],
    references: [bookings.customerId],
  }),
  cleanerBookings: many(bookings, {
    fields: [users.id],
    references: [bookings.cleanerId],
  }),
}))

// Types
export type User = InferModel<typeof users>
export type Profile = InferModel<typeof profiles>
export type Booking = InferModel<typeof bookings>
export type Config = InferModel<typeof config>