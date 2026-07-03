const { z } = require('zod');

// Phone regex for Indian mobile numbers (10 digits, optionally starting with +91 or 91)
const phoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

const phoneSchema = z
  .string()
  .min(1, "Phone number is required")
  .refine((val) => phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid 10-digit Indian phone number",
  });

const optionalPhoneSchema = z
  .string()
  .optional()
  .refine((val) => !val || phoneRegex.test(val.replace(/\s+/g, "")), {
    message: "Please enter a valid 10-digit Indian phone number",
  });

const emailSchema = z
  .string()
  .min(1, "Email address is required")
  .email("Please enter a valid email address");

const optionalEmailSchema = z
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
const passwordSchema = z
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

const optionalPasswordSchema = z
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

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: optionalEmailSchema,
  phone: optionalPhoneSchema,
  subject: z.string().optional(),
  message: z.string().min(5, "Message must be at least 5 characters"),
});

const registrationFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  password: passwordSchema,
  phone: optionalPhoneSchema,
  address: z.string().optional(),
});

const profileUpdateSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").optional(),
  phone: optionalPhoneSchema,
  address: z.string().optional(),
  password: optionalPasswordSchema,
});

module.exports = {
  contactFormSchema,
  registrationFormSchema,
  profileUpdateSchema,
};
