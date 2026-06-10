export type Action = "create" | "read" | "update" | "delete";
export type Resource = "branch" | "warehouse";

const roleAccess: Record<string, Record<Resource, Action[]>> = {
  SYSTEM_ADMIN: {
    branch: ["create", "read", "update", "delete"],
    warehouse: ["create", "read", "update", "delete"],
  },
  OWNER: {
    branch: ["create", "read", "update", "delete"],
    warehouse: ["create", "read", "update", "delete"],
  },
  GENERAL_MANAGER: {
    branch: ["create", "read", "update"],
    warehouse: ["create", "read", "update"],
  },
  OPERATIONS_MANAGER: {
    branch: ["read"],
    warehouse: ["read"],
  },
};

function getActionsForRole(role: string, resource: Resource): Action[] {
  return roleAccess[role]?.[resource] ?? [];
}

export function requirePermission(
  session: { user?: { id?: string; roles?: string[] } } | null,
  action: Action,
  resource: Resource,
): void {
  if (!session?.user?.id) {
    throw new Error("غير مصرح بالوصول");
  }

  const userRoles = session.user.roles ?? [];

  const allowed = userRoles.some((role: string) => {
    const actions = getActionsForRole(role, resource);
    return actions.includes(action);
  });

  if (!allowed) {
    throw new Error("ليس لديك صلاحية لهذا الإجراء");
  }
}

export function can(
  session: { user?: { id?: string; roles?: string[] } } | null,
  action: Action,
  resource: Resource,
): boolean {
  if (!session?.user?.id) return false;
  const userRoles = session.user.roles ?? [];
  return userRoles.some((role: string) => {
    const actions = getActionsForRole(role, resource);
    return actions.includes(action);
  });
}
