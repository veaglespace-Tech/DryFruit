import { z } from "zod";

// Phone pattern for Indian mobile numbers (10 digits, optionally starting with +91 or 91)
export const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((val) => phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid 10-digit Indian phone number",
  });

// Optional phone schema (validates format only if provided)
export const optionalPhoneSchema = z
  .string()
  .optional()
  .refine((val) => !val || phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid 10-digit Indian phone number",
  });

// Email validation
export const emailSchema = z
  .string()
  .min(1, "Email address is required")
  .email("Please enter a valid email address");

// Optional email validation (validates format only if provided)
export const optionalEmailSchema = z
  .string()
  .optional()
  .refine((val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
    message: "Please enter a valid email address",
  });

// Strong password validation rules:
// - At least 8 characters
// - At least one uppercase letter
// - At least one lowercase letter
// - At least one digit
// - At least one special character
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /\d/.test(val), {
    message: "Password must contain at least one number",
  })
  .refine((val) => /[@$!%*?&#]/.test(val), {
    message: "Password must contain at least one special character (@, $, !, %, *, ?, &, #)",
  });

export const optionalPasswordSchema = z
  .string()
  .optional()
  .refine(
    (val) => {
      if (!val) return true;
      return (
        val.length >= 8 &&
        /[A-Z]/.test(val) &&
        /[a-z]/.test(val) &&
        /\d/.test(val) &&
        /[@$!%*?&#]/.test(val)
      );
    },
    {
      message:
        "Password must be at least 8 characters and contain at least one uppercase, one lowercase, one number, and one special character (@, $, !, %, *, ?, &, #)",
    }
  );

// Schema for Contact Form
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: optionalEmailSchema,
  phone: optionalPhoneSchema,
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

// Schema for Checkout Form
export const checkoutFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  phone: phoneSchema,
  address: z.string().min(10, "Please enter a complete address (at least 10 characters)"),
  notes: z.string().optional(),
});

// Schema for User Registration
export const registrationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
  phone: optionalPhoneSchema,
  address: z.string().optional(),
});

// Schema for User Profile Update
export const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: optionalPhoneSchema,
  address: z.string().optional(),
  password: optionalPasswordSchema,
});
