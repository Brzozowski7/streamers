import {
  FilterQuery,
  Model,
  QueryOptions,
  UpdateQuery,
  Document,
} from 'mongoose';

export abstract class MongoRepository<D, T extends Model<any>> {
  constructor(readonly model: T) {}

  findById(
    id: string,
    projection?: Record<string, unknown>,
    queryOptions?: QueryOptions,
  ) {
    return this.model
      .findById<D & Document>(id, projection, queryOptions)
      .exec();
  }

  findOne(
    entityFilterQuery: FilterQuery<D>,
    projection?: Record<string, unknown>,
  ) {
    return this.model
      .findOne<D & Document>(entityFilterQuery, {
        ...projection,
      })
      .exec();
  }

  find(entityFilterQuery?: FilterQuery<D>) {
    return this.model.find<D & Document>(entityFilterQuery || {}).exec();
  }

  findWithDeclareResoult(
    entityFilterQuery?: FilterQuery<D>,
    projection?: Record<string, unknown>,
    options?: QueryOptions<D>,
  ) {
    return this.model
      .find<D & Document>(entityFilterQuery, {
        ...projection,
        options,
      })
      .exec();
  }

  create(
    createEntityData: Omit<Partial<D>, '_id' | 'createdAt' | 'updatedAt'>,
  ) {
    const entity = new this.model(createEntityData);
    return entity.save() as unknown as D;
  }

  createMany(createEntityData: Partial<D>[]) {
    const entities = createEntityData.map((entity) => new this.model(entity));
    return this.model.insertMany<D & Document>(entities);
  }

  findOneAndUpdate(
    entityFilterQuery: FilterQuery<D>,
    updateEntityData: UpdateQuery<D>,
  ) {
    return this.model
      .findOneAndUpdate<D & Document>(entityFilterQuery, updateEntityData, {
        new: true,
      })
      .exec();
  }

  findOneAndDelete(
    entityFilterQuery: FilterQuery<D>,
    queryOptions?: QueryOptions,
  ) {
    return this.model
      .findOneAndDelete<D & Document>(entityFilterQuery, queryOptions)
      .exec();
  }

  async deleteMany(entityFilterQuery: FilterQuery<D>) {
    const deleteResult = await this.model.deleteMany(entityFilterQuery).exec();
    return deleteResult.deletedCount >= 1;
  }
}
