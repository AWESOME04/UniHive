import { ReactNode } from 'react';

export type HiveType = "essentials" | "academia" | "logistics" | "buzz" | "archive" | "sidehustle";

export interface HiveCategory {
  id: string;
  name: string;
  icon: ReactNode;
  count: number;
  description: string;
  path?: string;
  color?: string;
}

export interface Hive {
  id: string;
  title: string;
  description: string;
  price: string | number;
  location?: string;
  datePosted?: string;
  tags?: string[];
  status?: string;
  author?: {
    name: string;
    avatar?: string;
  };
  hiveType?: {
    id: string;
    name: string;
    icon: string;
  };
  createdAt?: string;
  postedBy?: {
    name: string;
    avatar?: string;
  };
}
