import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createAndAuthenticateuser(
  app: FastifyInstance,
  isAdmin = false,
) {
  await prisma.user.create({
    data: {
      name: 'AlexandreMSouza',
      email: 'alemoura30@hotmail.com',
      password_hash: await hash('123123', 6),
      role: isAdmin ? 'ADMIN' : 'MEMBER',
    },
  })

  const authResponse = await request(app.server).post('/sessions').send({
    email: 'alemoura30@hotmail.com',
    password: '123123',
  })

  const { token } = authResponse.body

  return { token }
}
