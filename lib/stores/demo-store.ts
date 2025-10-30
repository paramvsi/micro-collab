import { create } from "zustand";
import { demoService } from "@/lib/api/mock/demo-service";
import type { DemoRequest, DemoEvent, DemoStats } from "@/types/demo";

interface DemoStore {
  // State
  requests: DemoRequest[];
  recentEvents: DemoEvent[];
  stats: DemoStats;
  isSimulationActive: boolean;

  // Filter state
  filters: {
    tags: string[];
    urgency: string[];
    mode: string[];
    duration: [number, number];
  };

  // Actions
  loadInitialData: () => void;
  startSimulation: () => void;
  stopSimulation: () => void;
  refreshRequests: () => void;
  updateFilters: (filters: Partial<DemoStore["filters"]>) => void;
  createOffer: (requestId: string, message: string) => void;
}

export const useDemoStore = create<DemoStore>((set, get) => ({
  // Initial state
  requests: [],
  recentEvents: [],
  stats: {
    totalRequests: 0,
    activeRequests: 0,
    totalOffers: 0,
    activeSessions: 0,
    completedSessions: 0,
    availableHelpers: 0,
  },
  isSimulationActive: false,
  filters: {
    tags: [],
    urgency: [],
    mode: [],
    duration: [1, 4],
  },

  // Load data on mount
  loadInitialData: () => {
    const requests = demoService.getAllRequests();
    const events = demoService.getRecentEvents();
    const stats = demoService.getStats();
    set({ requests, recentEvents: events, stats });
  },

  // Start auto-simulation
  startSimulation: () => {
    demoService.startAutoSimulation();

    // Listen for new events
    demoService.addEventListener((event) => {
      set((state) => ({
        recentEvents: [event, ...state.recentEvents].slice(0, 20),
        requests: demoService.getAllRequests(state.filters),
        stats: demoService.getStats(),
      }));
    });

    set({ isSimulationActive: true });
  },

  stopSimulation: () => {
    demoService.stopAutoSimulation();
    set({ isSimulationActive: false });
  },

  refreshRequests: () => {
    const { filters } = get();
    const requests = demoService.getAllRequests(filters);
    const stats = demoService.getStats();
    set({ requests, stats });
  },

  updateFilters: (newFilters) => {
    set((state) => {
      const filters = { ...state.filters, ...newFilters };
      const requests = demoService.getAllRequests(filters);
      return { filters, requests };
    });
  },

  createOffer: (requestId, message) => {
    demoService.createOffer(requestId, message);
    get().refreshRequests();
  },
}));
