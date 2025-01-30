import { USER_ROLES } from "@/constants/user-roles";

export type User = {
  id: string;
  email: string;
  role: (typeof USER_ROLES)[keyof typeof USER_ROLES];
};
