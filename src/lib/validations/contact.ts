import { z } from "zod";

export const createContactSchema = z.object({
  firstName: z.string().min(1, "First name is required").max(100),
  lastName: z.string().min(1, "Last name is required").max(100),
  email: z.string().email().optional().or(z.literal("")),
  mobilePhone: z.string().max(30).optional(),
  officePhone: z.string().max(30).optional(),
  title: z.string().max(255).optional(),
  companyId: z.string().optional(),
  linkedIn: z.string().max(500).optional(),
  contactRole: z.string().max(100).optional(),
});

export const updateContactSchema = createContactSchema.partial();

export type CreateContactInput = z.infer<typeof createContactSchema>;
export type UpdateContactInput = z.infer<typeof updateContactSchema>;
