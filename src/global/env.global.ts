export const isDev = process.env.NODE_ENV == 'development'

export const isTest = !!process.env.TEST || process.env.NODE_ENV == 'test'
