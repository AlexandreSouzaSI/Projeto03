import '@fastify/jwt'

declare module '@fastify/jwt'

export interface FatifyJWT {
  user: {
    sub: string
    role: 'ADMIN' | 'MEMBER'
  }
}
