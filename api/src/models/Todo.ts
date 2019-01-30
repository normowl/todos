import {Column, CreatedAt, Model, NotEmpty, Table, UpdatedAt} from 'sequelize-typescript';

const joi = require('joi');

@Table({})

export class Todo extends Model<Todo> {
  @Column name: string;

  @Column description: string;

  @Column due: Date;

  @Column completed: boolean;


  static joiValidate = joi.object().keys({
    id: joi.number().optional(),
    name: joi.string().required(),
    description: joi.string().allow('', null),
    due: joi.date().allow('', null),
    completed: joi.boolean().default(false),

  });
}
