import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Hive } from "../../types";

interface FilterOptions {
  tags: string[];
  startDate: string;
  endDate: string;
  minSalary: number;
  maxSalary: number;
  status: string[];
  category: string;
  university: string;
  location: string;
  jobType: string[];
  experienceLevel: string;
  positionLevel: string;
  lastUpdated: string;
}

interface JobsState {
  hives: Hive[];
  filteredJobs: Hive[];
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

const initialState: JobsState = {
  hives: [],
  filteredJobs: [],
  loading: false,
  error: null,
  searchTerm: "",
  location: "",
  pagination: {
    currentPage: 1,
    totalPages: 1,
    limit: 10,
  },
  filters: {
    tags: [],
    startDate: "",
    endDate: "",
    minSalary: 0,
    maxSalary: 10000,
    status: [],
    category: "",
    university: "",
    location: "",
    jobType: [],
    experienceLevel: "",
    positionLevel: "",
    lastUpdated: "",
  },
};

export const fetchJobs = createAsyncThunk(
  "hives/fetchJobs",
  async (
    { page = 1, limit = 10 }: { page?: number; limit?: number },
    { rejectWithValue }
  ) => {
    try {
      // API call to fetch hives
      // For development, we're returning mock data instead of making an actual API call
      // In a real app, uncomment the following:
      /*
      const response = await axios.get('/api/hives', {
        params: { page, limit }
      });
      return {
        hives: response.data.hives,
        totalPages: response.data.totalPages || Math.ceil(response.data.hives.length / limit),
        currentPage: page
      };
      */

      // Mock data for development
      const mockJobs: Hive[] = [
        {
          id: "1",
          title: "Research Assistant",
          company: "University of Ghana",
          description:
            "Looking for a research assistant to help with data collection and analysis for a research project in the Department of Economics.",
          status: "open",
          salary: 1500,
          location: "Legon, Accra",
          university: "University of Ghana",
          type: "Part-time",
          tags: ["research", "data-analysis", "economics"],
          postedAt: new Date().toISOString(),
          createdBy: "user1",
          deadline: new Date(
            Date.now() + 7 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "Research",
        },
        {
          id: "2",
          title: "Web Developer",
          company: "KNUST IT Department",
          description:
            "The IT Department at KNUST is looking for a web developer to help maintain and update the university website.",
          status: "open",
          salary: "2000-2500",
          location: "Kumasi",
          university: "Kwame Nkrumah University of Science and Technology",
          type: "Contract",
          tags: ["web-development", "javascript", "react"],
          postedAt: new Date().toISOString(),
          createdBy: "user2",
          deadline: new Date(
            Date.now() + 14 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "IT & Software",
        },
        {
          id: "3",
          title: "Teaching Assistant - Mathematics",
          company: "University of Cape Coast",
          description:
            "The Department of Mathematics is seeking a teaching assistant to help with undergraduate courses in calculus and linear algebra.",
          status: "open",
          salary: 1200,
          location: "Cape Coast",
          university: "University of Cape Coast",
          type: "Part-time",
          tags: ["teaching", "mathematics", "calculus"],
          postedAt: new Date().toISOString(),
          createdBy: "user3",
          deadline: new Date(
            Date.now() + 10 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "Education",
        },
        {
          id: "4",
          title: "Library Assistant",
          company: "Ghana Institute of Management and Public Administration",
          description:
            "The GIMPA Library is looking for a student assistant to help with cataloging and organizing library resources.",
          status: "completed",
          salary: 800,
          location: "Accra",
          university: "Ghana Institute of Management and Public Administration",
          type: "Part-time",
          tags: ["library", "organization", "customer-service"],
          postedAt: new Date().toISOString(),
          createdBy: "user4",
          deadline: new Date(
            Date.now() + 3 * 24 * 60 * 60 * 1000
          ).toISOString(),
          category: "Administration",
        },
      ];

      // Calculate pagination values
      const totalMockJobs = 12; // Pretend we have 12 total hives
      const totalPages = Math.ceil(totalMockJobs / limit);

      return {
        hives: mockJobs,
        totalPages: totalPages,
        currentPage: page,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch hives");
    }
  }
);

export const createJob = createAsyncThunk(
  "hives/createJob",
  async (
    hive: Omit<Hive, "id" | "postedAt" | "status">,
    { rejectWithValue }
  ) => {
    try {
      // Replace with your API endpoint
      const response = await axios.post("/api/hives", hive);
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to create hive");
    }
  }
);

const jobsSlice = createSlice({
  name: "hives",
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Hive[]>) => {
      state.hives = action.payload;
      state.filteredJobs = applyFiltersAndSearch(
        action.payload,
        state.filters,
        state.searchTerm,
        state.location
      );
    },
    addJob: (state, action: PayloadAction<Hive>) => {
      state.hives.push(action.payload);
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        state.searchTerm,
        state.location
      );
    },
    updateJob: (state, action: PayloadAction<Hive>) => {
      const index = state.hives.findIndex(
        (hive) => hive.id === action.payload.id
      );
      if (index !== -1) {
        state.hives[index] = action.payload;
      }
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        state.searchTerm,
        state.location
      );
    },
    removeJob: (state, action: PayloadAction<string>) => {
      state.hives = state.hives.filter((hive) => hive.id !== action.payload);
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        state.searchTerm,
        state.location
      );
    },
    setJobFilters: (state, action: PayloadAction<FilterOptions>) => {
      state.filters = action.payload;
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        action.payload,
        state.searchTerm,
        state.location
      );
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        action.payload,
        state.location
      );
    },
    setLocation: (state, action: PayloadAction<string>) => {
      state.location = action.payload;
      state.filters.location = action.payload;
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        state.searchTerm,
        action.payload
      );
    },
    setUniversity: (state, action: PayloadAction<string>) => {
      state.filters.university = action.payload;
      state.filteredJobs = applyFiltersAndSearch(
        state.hives,
        state.filters,
        state.searchTerm,
        state.location
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.hives = action.payload.hives;
        state.filteredJobs = applyFiltersAndSearch(
          action.payload.hives,
          state.filters,
          state.searchTerm,
          state.location
        );
        state.pagination.currentPage = action.payload.currentPage;
        state.pagination.totalPages = action.payload.totalPages;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.loading = false;
        state.hives.push(action.payload);
        state.filteredJobs = applyFiltersAndSearch(
          state.hives,
          state.filters,
          state.searchTerm,
          state.location
        );
      })
      .addCase(createJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

// Helper function to apply filters and search
const applyFiltersAndSearch = (
  hives: Hive[],
  filters: FilterOptions,
  searchTerm: string,
  location: string
): Hive[] => {
  let filtered = [...hives];

  // Apply search term
  if (searchTerm) {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    filtered = filtered.filter(
      (hive) =>
        hive.title.toLowerCase().includes(lowerCaseSearchTerm) ||
        hive.description?.toLowerCase().includes(lowerCaseSearchTerm) ||
        hive.company.toLowerCase().includes(lowerCaseSearchTerm) ||
        hive.tags?.some((tag) =>
          tag.toLowerCase().includes(lowerCaseSearchTerm)
        )
    );
  }

  // Apply location filter
  if (location) {
    filtered = filtered.filter(
      (hive) =>
        hive.location.toLowerCase().includes(location.toLowerCase()) ||
        hive.university?.toLowerCase().includes(location.toLowerCase())
    );
  }

  // Apply university filter
  if (filters.university) {
    filtered = filtered.filter((hive) =>
      hive.university?.toLowerCase().includes(filters.university.toLowerCase())
    );
  }

  // Apply category filter
  if (filters.category) {
    filtered = filtered.filter(
      (hive) => hive.category?.toLowerCase() === filters.category.toLowerCase()
    );
  }

  // Apply tags filter
  if (filters.tags.length > 0) {
    filtered = filtered.filter((hive) =>
      hive.tags?.some((tag) => filters.tags.includes(tag))
    );
  }

  // Apply status filter
  if (filters.status.length > 0) {
    filtered = filtered.filter(
      (hive) => hive.status && filters.status.includes(hive.status)
    );
  }

  // Apply hive type filter
  if (filters.jobType.length > 0) {
    filtered = filtered.filter(
      (hive) => hive.type && filters.jobType.includes(hive.type)
    );
  }

  // Apply salary range filter
  if (filters.minSalary > 0 || filters.maxSalary < 10000) {
    filtered = filtered.filter((hive) => {
      if (typeof hive.salary === "number") {
        return (
          hive.salary >= filters.minSalary && hive.salary <= filters.maxSalary
        );
      } else if (typeof hive.salary === "string") {
        // Handle salary ranges like "2000-3000"
        if (hive.salary.includes("-")) {
          const [min, max] = hive.salary
            .split("-")
            .map((s) => parseFloat(s.trim()));
          return min >= filters.minSalary && max <= filters.maxSalary;
        } else {
          // Handle single value as string
          const salary = parseFloat(hive.salary.replace(/[^0-9.]/g, ""));
          return (
            !isNaN(salary) &&
            salary >= filters.minSalary &&
            salary <= filters.maxSalary
          );
        }
      }
      return true;
    });
  }

  // Apply date filters
  if (filters.startDate && filters.endDate) {
    const startDate = new Date(filters.startDate);
    const endDate = new Date(filters.endDate);

    filtered = filtered.filter((hive) => {
      const jobDate = hive.deadline ? new Date(hive.deadline) : null;
      if (!jobDate) return true;
      return jobDate >= startDate && jobDate <= endDate;
    });
  } else if (filters.startDate) {
    const startDate = new Date(filters.startDate);

    filtered = filtered.filter((hive) => {
      const jobDate = hive.deadline ? new Date(hive.deadline) : null;
      if (!jobDate) return true;
      return jobDate >= startDate;
    });
  } else if (filters.endDate) {
    const endDate = new Date(filters.endDate);

    filtered = filtered.filter((hive) => {
      const jobDate = hive.deadline ? new Date(hive.deadline) : null;
      if (!jobDate) return true;
      return jobDate <= endDate;
    });
  }

  return filtered;
};

export const {
  setJobs,
  addJob,
  updateJob,
  removeJob,
  setJobFilters,
  setCurrentPage,
  setSearchTerm,
  setLocation,
  setUniversity,
} = jobsSlice.actions;

export default jobsSlice.reducer;
