export enum UserRole {
  EXECUTIVE_MANAGER = 'EXECUTIVE_MANAGER',
  COORDINATOR = 'COORDINATOR',
  EMPLOYEE = 'EMPLOYEE',
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedTo: string[];
  createdBy: string;
  createdAt: string;
  dueDate: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  userId: string;
  timestamp: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  priority: 'normal' | 'important' | 'urgent';
  viewedBy: string[];
}

export interface Event {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  attendees: string[];
  createdBy: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  data: any;
  createdBy: string;
  createdAt: string;
  type: 'performance' | 'tasks' | 'attendance' | 'custom';
}

// Translation mappings
export const StatusTranslations = {
  'pending': 'pendente',
  'in-progress': 'em andamento',
  'completed': 'concluído'
} as const;

export const PriorityTranslations = {
  'low': 'baixa',
  'medium': 'média',
  'high': 'alta'
} as const;

export const RoleTranslations = {
  [UserRole.EXECUTIVE_MANAGER]: 'Gerente Executivo',
  [UserRole.COORDINATOR]: 'Coordenador',
  [UserRole.EMPLOYEE]: 'Funcionário'
} as const;