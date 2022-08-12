import { IShemaParameters } from '../types/middlewares';

const yup = require('yup');
require('yup-password')(yup);

export const schema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string().email(),
  password: yup.string().password(),
});

export async function* validationGenerator(schemaName: string, parameters: IShemaParameters) {
  if (schemaName === 'user') {
    yield (await schema.validate(parameters));
  }
}
