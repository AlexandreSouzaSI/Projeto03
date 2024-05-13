import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateuser } from '@/utils/test/create-and-authenticate-user'

describe('ProfiCreate Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateuser(app, true)
    console.log('response: ', token)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia teste',
        description: 'Academia para testar',
        phone: '31326525255',
        latitude: '-27.2092052',
        longitude: '-49.6401091',
      })

    expect(response.statusCode).toEqual(201)
  })
})
