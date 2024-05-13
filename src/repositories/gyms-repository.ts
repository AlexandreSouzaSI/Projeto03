import { Gym, Prisma } from '@prisma/client'

export interface FindManyByParams {
  latitude: number
  longitude: number
}

export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  searchMany(query: string, page: number): Promise<Gym[]>
  findManyNearby(params: FindManyByParams): Promise<Gym[]>
  create(data: Prisma.GymCreateInput): Promise<Gym>
}
