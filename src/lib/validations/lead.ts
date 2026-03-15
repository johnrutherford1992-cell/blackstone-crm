import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(1, "Lead name is required").max(255),
  value: z.number().min(0).optional(),
  companyId: z.string().optional(),
  assignedToId: z.string().optional(),
  divisionId: z.string().optional(),
  source: z.string().max(255).optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  zipCode: z.string().max(20).optional(),
  gsf: z.number().int().min(0).optional(),
  contractTypeId: z.string().optional(),
  tenderTypeId: z.string().optional(),
  marketSectorId: z.string().optional(),
  deliveryMethodId: z.string().optional(),
});

export const updateLeadSchema = createLeadSchema.partial().extend({
  isSnoozed: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  isPriority: z.boolean().optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;
export type UpdateLeadInput = z.infer<typeof updateLeadSchema>;
