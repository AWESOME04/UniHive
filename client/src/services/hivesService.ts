import axios from 'axios';

const API_URL = 'https://unihive-hmoi.onrender.com/api';

export interface HiveType {
  id: string;
  name: string;
  description: string;
  icon: string;
}

export interface Hive {
  id: string;
  title: string;
  description: string;
  hiveTypeId: string;
  price: string;
  status: string;
  postedById: string;
  assignedToId: string | null;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
  hiveType: HiveType;
}

export interface HivesResponse {
  status: string;
  count: number;
  data: Hive[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    pages: number;
    currentPage: number;
  };
}

const getHives = async (): Promise<HivesResponse> => {
  try {
    const response = await axios.get(`${API_URL}/hives`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hives:', error);
    throw error;
  }
};

const hivesService = {
  getHives,
};

export default hivesService;
