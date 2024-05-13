import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { createAndAuthenticateuser } from '@/utils/test/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })

  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateuser(app, true)

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia teste',
        description: 'Academia para testar',
        phone: '31326525255',
        latitude: '-27.2092052',
        longitude: '-49.6401091',
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Academia nova 2',
        description: 'Academia para testar',
        phone: '31326525255',
        latitude: '-27.2092052',
        longitude: '-49.6401091',
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({ query: 'Academia teste' })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Academia teste',
      }),
    ])
  })
})
