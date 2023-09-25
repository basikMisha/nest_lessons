import { plainToInstance } from 'class-transformer';
import { CreateTaskDTO } from './create-task.dto';
import { validate } from 'class-validator';
import { Status } from '../task.interface';

describe('create-task.dto', () => {
  let dto;
  beforeAll(() => {
    dto = {
      task: '',
      tags: [],
      status: '',
    };
  });
  it('task is empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((error) => error.property).includes('task')).toBeTruthy();
  });
  it('task is not empty', async () => {
    dto.task = 'hui';
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((error) => error.property).includes('task')).toBeFalsy();
  });
  it('tags is empty', async () => {
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((error) => error.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).toBe(0);
  });
  it('error if one or more tags element is not a string', async () => {
    dto.tags = ['1', 1];
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((error) => error.property).includes('tags')).toBeTruthy();
    expect(dto.tags.length).not.toBe(0);
    expect(dto.tags.every((tag) => typeof tag === 'string')).not.toBeTruthy();
  });
  it('each tags element is string and tags is not empty', async () => {
    dto.tags = ['1', '2'];
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(errors.map((error) => error.property).includes('tags')).toBeFalsy();
  });
  it('status type is not a value of enum Status', async () => {
    dto.status = 'test';
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(
      errors.map((error) => error.property).includes('status'),
    ).toBeTruthy();
  });
  it('status type is a value of enum Status', async () => {
    dto.status = Status.CREATED;
    const ofImportDto = plainToInstance(CreateTaskDTO, dto);
    const errors = await validate(ofImportDto);
    expect(
      errors.map((error) => error.property).includes('status'),
    ).toBeFalsy();
    expect(dto.status).toBe('created');
  });
});
