import {z} from 'zod';

export const addCategoryFormSchema = z.object({
  name: z
    .string({required_error: 'name is required'})
    .trim()
    .min(1, 'name is required'),
  description: z.string({required_error: 'description is required'}).trim(),
  origin: z.string({required_error: 'origin is required'}).trim(),
  image: z.string({required_error: 'image is required'}),
});
export const editCategoryFormSchema = addCategoryFormSchema;
