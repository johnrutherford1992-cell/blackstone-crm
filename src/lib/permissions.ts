type Role = "ADMIN" | "LIMITED";

type Action = "create" | "read" | "update" | "delete" | "manage_team" | "manage_settings";

type Resource = "project" | "lead" | "contact" | "company" | "employee" | "document" | "settings" | "team";

const PERMISSION_MATRIX: Record<Role, Record<Resource, Action[]>> = {
  ADMIN: {
    project: ["create", "read", "update", "delete"],
    lead: ["create", "read", "update", "delete"],
    contact: ["create", "read", "update", "delete"],
    company: ["create", "read", "update", "delete"],
    employee: ["create", "read", "update", "delete"],
    document: ["create", "read", "update", "delete"],
    settings: ["read", "update", "manage_settings"],
    team: ["read", "create", "update", "delete", "manage_team"],
  },
  LIMITED: {
    project: ["create", "read", "update"],
    lead: ["create", "read", "update"],
    contact: ["create", "read", "update"],
    company: ["read"],
    employee: ["read"],
    document: ["create", "read"],
    settings: ["read"],
    team: ["read"],
  },
};

export function hasPermission(role: Role, resource: Resource, action: Action): boolean {
  return PERMISSION_MATRIX[role]?.[resource]?.includes(action) ?? false;
}

export function canManageTeam(role: Role): boolean {
  return hasPermission(role, "team", "manage_team");
}

export function canManageSettings(role: Role): boolean {
  return hasPermission(role, "settings", "manage_settings");
}
