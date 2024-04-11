import {z} from 'zod';

// export const exampleFormSchema = z
//   .object({
//     firstName: z
//       .string({required_error: `firstname is required`})
//       .trim()
//       .min(1, 'firstname is required'),
//     lastName: z
//       .string({required_error: `lastname is required`})
//       .trim()
//       .min(1, 'lastname is required'),
//   })
//   .and(
//     z.discriminatedUnion('ageType', [
//       z.object({
//         ageType: z.literal('fixed'),
//         age: z.coerce
//           .number({
//             required_error: `age is required`,
//             invalid_type_error: `age must be a number`,
//           })
//           .positive(`age must be positive`),
//       }),
//       z.object({
//         ageType: z.literal('range'),
//         min: z.coerce
//           .number({
//             required_error: `is required`,
//             invalid_type_error: `must be a number`,
//           })
//           .positive(`must be positive`),
//         max: z.coerce
//           .number({
//             required_error: `is required`,
//             invalid_type_error: `must be a number`,
//           })
//           .positive(`must be positive`),
//       }),
//     ]),
//   )
//   .refine(
//     data =>
//       (data.ageType === 'range' && data.min < data.max) ||
//       data.ageType === 'fixed',
//     {
//       message: 'max must be greater than min',
//       path: ['max'],
//     },
//   );

export const loginFormSchema = z.object({
  email: z
    .string({required_error: 'email is required'})
    .trim()
    .min(1, 'email is required')
    .email('invalid email')
    .toLowerCase(),
  password: z
    .string({required_error: 'password is required'})
    .trim()
    .min(1, 'password is required'),
});

export const signUpFormSchema = loginFormSchema;

export const phoneFormSchema = z.object({
  phone: z
    .string({required_error: 'phone number is required'})
    .trim()
    .regex(/^\+\d+$/, 'invalid phone number')
    .min(6, 'minimum is 6 digits'),
});
