import axios from 'axios';
import api from '../utils/apiUtils';

// Define Event interface
interface Event {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate?: string;
  location: string;
  university: string;
  universityId: string;
  organizer: string;
  organizerId: string;
  coverImage?: string;
  tags?: string[];
  category?: string;
  isVirtual: boolean;
  virtualLink?: string;
  registrationRequired: boolean;
  registrationLink?: string;
  registrationDeadline?: string;
  maxAttendees?: number;
  currentAttendees?: number;
  createdAt: string;
  updatedAt?: string;
}

// Event service
export const eventService = {
  // Get all events with pagination and filters
  getEvents: async (params: {
    page?: number;
    limit?: number;
    searchTerm?: string;
    university?: string;
    category?: string;
    tags?: string[];
    startDate?: string;
    endDate?: string;
    isVirtual?: boolean;
    isUpcoming?: boolean;
  }) => {
    try {
      const response = await api.get('/events', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch events');
      }
      throw new Error('Network error while fetching events');
    }
  },

  // Get event by ID
  getEventById: async (eventId: string) => {
    try {
      const response = await api.get(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch event details');
      }
      throw new Error('Network error while fetching event details');
    }
  },

  // Create a new event
  createEvent: async (eventData: Omit<Event, 'id' | 'createdAt' | 'currentAttendees'>) => {
    try {
      const response = await api.post('/events', eventData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to create event');
      }
      throw new Error('Network error while creating event');
    }
  },

  // Update an event
  updateEvent: async (eventId: string, eventData: Partial<Event>) => {
    try {
      const response = await api.put(`/events/${eventId}`, eventData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to update event');
      }
      throw new Error('Network error while updating event');
    }
  },

  // Delete an event
  deleteEvent: async (eventId: string) => {
    try {
      const response = await api.delete(`/events/${eventId}`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to delete event');
      }
      throw new Error('Network error while deleting event');
    }
  },

  // Register for an event
  registerForEvent: async (eventId: string, registrationData?: {
    additionalInfo?: Record<string, string>;
  }) => {
    try {
      const response = await api.post(`/events/${eventId}/register`, registrationData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to register for event');
      }
      throw new Error('Network error while registering for event');
    }
  },

  // Cancel event registration
  cancelEventRegistration: async (eventId: string) => {
    try {
      const response = await api.delete(`/events/${eventId}/register`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to cancel event registration');
      }
      throw new Error('Network error while canceling event registration');
    }
  },

  // Get event attendees (for event organizers)
  getEventAttendees: async (eventId: string, params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get(`/events/${eventId}/attendees`, { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch event attendees');
      }
      throw new Error('Network error while fetching event attendees');
    }
  },

  // Get user's registered events
  getUserEvents: async (params: { page?: number; limit?: number; upcoming?: boolean }) => {
    try {
      const response = await api.get('/users/events', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch your events');
      }
      throw new Error('Network error while fetching your events');
    }
  },

  // Save/bookmark an event
  saveEvent: async (eventId: string) => {
    try {
      const response = await api.post(`/events/${eventId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to save event');
      }
      throw new Error('Network error while saving event');
    }
  },

  // Unsave/unbookmark an event
  unsaveEvent: async (eventId: string) => {
    try {
      const response = await api.delete(`/events/${eventId}/save`);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to unsave event');
      }
      throw new Error('Network error while unsaving event');
    }
  },

  // Get user's saved events
  getSavedEvents: async (params: { page?: number; limit?: number }) => {
    try {
      const response = await api.get('/users/saved-events', { params });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        throw new Error(error.response.data.message || 'Failed to fetch saved events');
      }
      throw new Error('Network error while fetching saved events');
    }
  }
};

export default eventService;
