import { z } from "zod";

export const createProjectSchema = z.object({
  name: z.string().min(1, "Project name is required").max(255),
  contractValue: z.number().min(0).optional(),
  stageId: z.string().optional(),
  divisionId: z.string().optional(),
  assignedToId: z.string().optional(),
  address: z.string().max(500).optional(),
  city: z.string().max(100).optional(),
  state: z.string().max(100).optional(),
  zipCode: z.string().max(20).optional(),
  gsf: z.number().int().min(0).optional(),
  projectDuration: z.number().int().min(0).optional(),
  winProbability: z.number().min(0).max(100).optional(),
  source: z.string().max(255).optional(),
  marketSectorId: z.string().optional(),
  deliveryMethodId: z.string().optional(),
  contractTypeId: z.string().optional(),
  tenderTypeId: z.string().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
