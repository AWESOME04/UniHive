import { ReactNode } from 'react';

// Define the EssentialsDetails interface
export interface EssentialsDetails {
  hiveId?: string;
  condition?: string;
  brand?: string;
  purchaseDate?: string;
  itemCategory?: string;
  photos?: string[];
  pickupLocation?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface HiveType {
  id: string;
  name: string;
  icon: string;
  description?: string;
}
export interface Hive {
  id: string;
  title: string;
  description: string;
  hiveTypeId: string;
  price: string | number;
  status: string;
  postedById: string;
  postedBy?: {
    id: string;
    name: string;
    profileImage?: string | null;
  };
  assignedToId?: string | null;
  deadline?: string | null;
  createdAt: string;
  updatedAt: string;
  hiveType?: HiveType;
  essentialsDetails?: EssentialsDetails;
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
