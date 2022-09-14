import { Model, isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/catalog';

abstract class MongoModel<T> implements IModel<T> {
  protected _model:Model<T>;

  constructor(model:Model<T>) {
    this._model = model;
  }
  
  public async create(obj:T):Promise<T | null> {
    return this._model.create({ ...obj });
  }

  public async read():Promise<T[]> {
    return this._model.find({});
  }

  public async readOne(_id:string):Promise<T | null> {
    if (!isValidObjectId(_id)) throw new Error(ErrorTypes.InvalidMongoId);
    return this._model.findOne({ _id });
  }

  public async update(_id:string, obj:T):Promise<T | null> {
    return this._model.updateOne({ _id }, { $set: { obj } });
  }

  public async delete(_id:string):Promise<T | null> {
    return this._model.deleteOne({ _id });
  }
}

export default MongoModel;