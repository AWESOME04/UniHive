import { ReactNode } from 'react';

// Define the Hive interface
export interface Hive {
  id: string;
  title: string;
  description: string;
  price: string | number;
  location?: string;
  hiveType: {
    id: string;
    name: string;
    icon: string;
    description?: string;
  };
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  tags?: string[];
  userId?: string;
  postedBy?: {
    name: string;
    avatar?: string;
  };
}

// Define the HiveCategory interface
export interface HiveCategory {
  id: string;
  name: string;
  icon: ReactNode;
  count: number;
  description: string;
  path?: string;
  color?: string;
}
