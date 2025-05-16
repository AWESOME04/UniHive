import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { Task } from '../../types';

interface FilterOptions {
  tags: string[];
  startDate: string;
  endDate: string;
  minPoints: number;
  maxPoints: number;
  status: string[];
  category: string;
  subcategory: string;
  location: string;
  workplaceType: string[];
  experienceLevel: string;
  positionLevel: string;
  lastUpdated: string;
}

interface TasksState {
  tasks: Task[];
  filteredTasks: Task[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  location: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  filters: FilterOptions;
}

const initialState: TasksState = {
  tasks: [],
  filteredTasks: [],
  loading: false,
  error: null,
  searchTerm: '',
  location: '',
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
  filters: {
    tags: [],
    startDate: '',
    endDate: '',
    minPoints: 0,
    maxPoints: 100,
    status: [],
    category: '',
    subcategory: '',
    location: '',
    workplaceType: [],
    experienceLevel: '',
    positionLevel: '',
    lastUpdated: '',
  },
};

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks', 
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      // API call to fetch tasks
      // For development, we're returning mock data instead of making an actual API call
      // In a real app, uncomment the following:
      /*
      const response = await axios.get('/api/tasks', {
        params: { page, limit }
      });
      return {
        tasks: response.data.tasks,
        totalPages: response.data.totalPages || Math.ceil(response.data.tasks.length / limit),
        currentPage: page
      };
      */
      
      // Mock data for development
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'Python Tutoring for First-year Students',
          description: 'Looking for a tutor to help with Python programming basics. Need help with variables, loops, and functions.',
          status: 'open',
          points: 25,
          tags: ['python', 'tutoring', 'programming'],
          createdAt: new Date().toISOString(),
          createdBy: 'user1',
          deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'education'
        },
        {
          id: '2',
          title: 'Website Design for Student Organization',
          description: 'Our student club needs a new website. Looking for someone with HTML, CSS and JavaScript skills.',
          status: 'in-progress',
          points: 50,
          tags: ['web', 'design', 'javascript'],
          createdAt: new Date().toISOString(),
          createdBy: 'user2',
          deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'design'
        },
        {
          id: '3',
          title: 'Research Assistant for Biology Project',
          description: 'Professor needs a student assistant to help with data collection and analysis for a biology research project.',
          status: 'open',
          points: 40,
          tags: ['research', 'biology', 'data-analysis'],
          createdAt: new Date().toISOString(),
          createdBy: 'user3',
          deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'academics'
        },
        {
          id: '4',
          title: 'Math Homework Help',
          description: 'Need assistance with calculus assignment due next week. Will provide all materials.',
          status: 'completed',
          points: 15,
          tags: ['math', 'calculus', 'homework'],
          createdAt: new Date().toISOString(),
          createdBy: 'user4',
          deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
          category: 'academics'
        }
      ];
      
      // Calculate pagination values
      const totalMockTasks = 12; // Pretend we have 12 total tasks
      const totalPages = Math.ceil(totalMockTasks / limit);
      
      return {
        tasks: mockTasks,
        totalPages: totalPages,
        currentPage: page
      };
    } catch (error) {
      return rejectWithValue('Failed to fetch tasks');
    }
  }
);

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Omit<Task, 'id' | 'createdAt' | 'status'>, { rejectWithValue }) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post('/api/tasks', task);
      return response.data;
    } catch (error) {
      return rejectWithValue('Failed to create task');
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
      state.filteredTasks = applyFiltersAndSearch(action.payload, state.filters, state.searchTerm, state.location);
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload);
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, state.searchTerm, state.location);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id);
      if (index !== -1) {
        state.tasks[index] = action.payload;
      }
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, state.searchTerm, state.location);
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, state.searchTerm, state.location);
    },
    setTaskFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
      state.filteredTasks = applyFiltersAndSearch(state.tasks, action.payload, state.searchTerm, state.location);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, action.payload, state.location);
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
      state.filters.location = action.payload;
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, state.searchTerm, action.payload);
    },
    setCategoryFilter: (state, action: PayloadAction<string>) => {
      // Toggle category if it's already selected
      state.filters.category = state.filters.category === action.payload ? '' : action.payload;
      state.filteredTasks = applyFiltersAndSearch(state.tasks, state.filters, state.searchTerm, state.location);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload.tasks;
        state.filteredTasks = applyFiltersAndSearch(action.payload.tasks, state.filters, state.searchTerm, state.location);
        state.pagination.currentPage = action.payload.currentPage;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to apply filters and search
const applyFiltersAndSearch = (tasks: Task[], filters: FilterOptions, searchTerm: string, location: string): Task[] => {
  return tasks.filter(task => {
    // Search term filtering
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        task.title.toLowerCase().includes(searchLower) ||
        task.description.toLowerCase().includes(searchLower) ||
        task.tags.some(tag => tag.toLowerCase().includes(searchLower));
      
      if (!matchesSearch) return false;
    }
    
    // Location filtering
    if (location && task.location) {
      if (!task.location.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }
    }
    
    // Category filtering
    if (filters.category && task.category) {
      if (task.category !== filters.category) {
        return false;
      }
    }
    
    // Subcategory filtering
    if (filters.subcategory && task.subcategory) {
      if (task.subcategory !== filters.subcategory) {
        return false;
      }
    }
    
    // Filter by tags if any are selected
    if (filters.tags.length > 0) {
      const hasMatchingTag = task.tags.some(tag => filters.tags.includes(tag));
      if (!hasMatchingTag) return false;
    }
    
    // Filter by status if any are selected
    if (filters.status.length > 0 && !filters.status.includes(task.status)) {
      return false;
    }
    
    // Filter by points range
    if (task.points < filters.minPoints || task.points > filters.maxPoints) {
      return false;
    }
    
    // Filter by date range if provided
    if (filters.startDate && task.deadline) {
      const taskDate = new Date(task.deadline);
      const startDate = new Date(filters.startDate);
      if (taskDate < startDate) return false;
    }
    
    if (filters.endDate && task.deadline) {
      const taskDate = new Date(task.deadline);
      const endDate = new Date(filters.endDate);
      endDate.setHours(23, 59, 59, 999); // Set to end of day
      if (taskDate > endDate) return false;
    }

    // Filter by last updated
    if (filters.lastUpdated && task.updatedAt) {
      const taskDate = new Date(task.updatedAt);
      
      switch (filters.lastUpdated) {
        case 'today':
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (taskDate < today) return false;
          break;
        case 'last-week':
          const lastWeek = new Date();
          lastWeek.setDate(lastWeek.getDate() - 7);
          if (taskDate < lastWeek) return false;
          break;
        case 'last-month':
          const lastMonth = new Date();
          lastMonth.setMonth(lastMonth.getMonth() - 1);
          if (taskDate < lastMonth) return false;
          break;
      }
    }
    
    // Filter by workplace type
    if (filters.workplaceType.length > 0 && task.workplaceType) {
      if (!filters.workplaceType.includes(task.workplaceType)) {
        return false;
      }
    }
    
    // Filter by experience level
    if (filters.experienceLevel && task.experienceLevel) {
      if (task.experienceLevel !== filters.experienceLevel) {
        return false;
      }
    }
    
    // Filter by position level
    if (filters.positionLevel && task.positionLevel) {
      if (task.positionLevel !== filters.positionLevel) {
        return false;
      }
    }
    
    return true;
  });
};

export const { 
  setTasks, 
  addTask, 
  updateTask, 
  removeTask, 
  setTaskFilters, 
  setCurrentPage,
  setSearchTerm,
  setLocation,
  setCategoryFilter
} = tasksSlice.actions;
export default tasksSlice.reducer;
