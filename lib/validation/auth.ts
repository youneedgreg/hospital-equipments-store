import { z } from "zod"

export const buyerRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must not exceed 15 digits"),
  organization: z.string().optional(),
  organizationType: z.string().min(1, "Organization type is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})

export const supplierRegistrationSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  contactPerson: z.string().min(1, "Contact person is required"),
  position: z.string().min(1, "Position is required"),
  businessEmail: z.string().email("Invalid business email address"),
  businessPhone: z.string().min(10, "Business phone number must be at least 10 digits").max(15, "Business phone number must not exceed 15 digits"),
  kraPin: z.string().min(10, "KRA PIN is required and must be at least 10 characters").max(11, "KRA PIN must not exceed 11 characters"), // Assuming KRA PIN format A000000000A
  location: z.string().min(1, "Location is required"),
  businessAddress: z.string().min(1, "Business address is required"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[!@#$%^&*(),.?":{}|<>]/, "Password must contain at least one special character"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions and supplier agreement",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
})
