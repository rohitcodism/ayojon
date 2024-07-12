import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(5, "Username must be of at least three characters!!")
    .max(12, "Username can't be more than 8 characters!!")
    .regex(/^[a-z0-9_]+$/, "Username cannot contain capital letters or special characters")