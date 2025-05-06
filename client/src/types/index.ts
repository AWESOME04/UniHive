export interface User {
  id: string;
  username: string;
  email: string;
  avatarUrl?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  deadline?: string;
  status: 'open' | 'in-progress' | 'completed';
  createdBy: string;
  assignedTo?: string;
  tags: string[];
  points: number;
  price?: number | string;
  difficulty?: 'easy' | 'medium' | 'hard';
  estimatedHours?: number;
  location?: string;
  university?: string;
  category?: string;
  subcategory?: string;
  workplaceType?: 'on-site' | 'remote' | 'hybrid';
  experienceLevel?: 'no-experience' | 'entry-level' | '1-3-years' | '3-5-years' | '5-plus-years';
  positionLevel?: 'intern' | 'junior' | 'mid-level' | 'senior' | 'manager';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  description?: string;
  location: string;
  university?: string;
  type: string;
  salary: string | number;
  postedAt: string;
  updatedAt?: string;
  deadline?: string;
  status?: string;
  createdBy: string;
  tags?: string[];
  category?: string;
  workplaceType?: 'on-site' | 'remote' | 'hybrid';
  experienceLevel?: 'no-experience' | 'entry-level' | '1-3-years' | '3-5-years' | '5-plus-years';
  positionLevel?: 'intern' | 'junior' | 'mid-level' | 'senior' | 'manager';
  applicationProcess?: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];
  contactEmail?: string;
  contactPhone?: string;
  applicationUrl?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
}

export interface AppState {
  loading: boolean;
  error: string | null;
}
