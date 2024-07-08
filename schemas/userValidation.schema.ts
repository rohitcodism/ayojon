import { z } from "zod";

export const usernameValidation = z
.string()
.min(5,"Username must contain at least 5 characters!!")
.max(12, "Username can contain at max 12 characters!!")
.regex(/^[a-z0-9_]+$/, "Username cannot contain capital letters or special characters");