export const SECURITY = {
  jwtSecret: 'dimplesY_secret',
  jwtExpire: '7d',
}

export const REDIS = {
  host: 'localhost',
  port: 6379,
  password: null,
  ttl: null,
  httpCacheTTL: 15,
  max: 120,
  disableApiCache: false,
}

export const DATABASE = {
  url: 'mysql://root:root@localhost:3306/nest',
}

type SYSTEM = {
  banner: boolean | (() => boolean)
}

export const SYSTEM: SYSTEM = {
  banner: true,
}
