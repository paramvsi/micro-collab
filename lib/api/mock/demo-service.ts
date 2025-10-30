import { generateRequest, generateOffer, generateUser } from "./data-generators";
import type {
  DemoRequest,
  DemoOffer,
  DemoEvent,
  DemoStats,
  DemoEventType,
} from "@/types/demo";

class DemoService {
  private requests: Map<string, DemoRequest> = new Map();
  private offers: Map<string, DemoOffer> = new Map();
  private events: DemoEvent[] = [];
  private simulationInterval?: NodeJS.Timeout;
  private eventListeners: Array<(event: DemoEvent) => void> = [];

  constructor() {
    this.initializeData();
  }

  // Initialize with 10-15 realistic requests
  private initializeData() {
    const initialCount = Math.floor(Math.random() * 6) + 10; // 10-15
    for (let i = 0; i < initialCount; i++) {
      const request = generateRequest();
      this.requests.set(request.id, request);

      // Add 0-3 offers per request
      const offerCount = Math.floor(Math.random() * 4);
      for (let j = 0; j < offerCount; j++) {
        const offer = generateOffer(request.id);
        this.offers.set(offer.id, offer);
        request.offers.push(offer);
      }
    }
  }

  // Start 45-second auto-simulation loop
  startAutoSimulation() {
    if (this.simulationInterval) return;

    this.simulationInterval = setInterval(() => {
      this.generateRandomEvent();
    }, 45000); // 45 seconds
  }

  stopAutoSimulation() {
    if (this.simulationInterval) {
      clearInterval(this.simulationInterval);
      this.simulationInterval = undefined;
    }
  }

  // Generate random marketplace event
  private generateRandomEvent() {
    const random = Math.random();
    let event: DemoEvent | undefined;

    if (random < 0.4) {
      // 40% - New request posted
      const request = generateRequest();
      this.requests.set(request.id, request);
      event = this.createEvent("request_posted", request.requester.name, {
        request,
      });
    } else if (random < 0.75) {
      // 35% - Offer sent
      const openRequests = Array.from(this.requests.values()).filter(
        (r) => r.status === "open"
      );
      if (openRequests.length > 0) {
        const request =
          openRequests[Math.floor(Math.random() * openRequests.length)];
        const offer = generateOffer(request.id);
        this.offers.set(offer.id, offer);
        request.offers.push(offer);
        event = this.createEvent("offer_sent", offer.helper.name, {
          request,
          offer,
        });
      }
    } else if (random < 0.9) {
      // 15% - Session started
      const requestsWithOffers = Array.from(this.requests.values()).filter(
        (r) => r.status === "open" && r.offers.length > 0
      );
      if (requestsWithOffers.length > 0) {
        const request =
          requestsWithOffers[
            Math.floor(Math.random() * requestsWithOffers.length)
          ];
        request.status = "in-progress";
        event = this.createEvent("session_started", request.requester.name, {
          request,
        });
      }
    } else {
      // 10% - Session completed
      const inProgressRequests = Array.from(this.requests.values()).filter(
        (r) => r.status === "in-progress"
      );
      if (inProgressRequests.length > 0) {
        const request =
          inProgressRequests[
            Math.floor(Math.random() * inProgressRequests.length)
          ];
        request.status = "completed";
        event = this.createEvent("session_completed", request.requester.name, {
          request,
        });
      }
    }

    if (event) {
      this.events.unshift(event);
      this.notifyListeners(event);
    }
  }

  private createEvent(
    type: DemoEventType,
    actor: string,
    data: DemoEvent["data"]
  ): DemoEvent {
    const messages: Record<DemoEventType, string> = {
      request_posted: `${actor} posted a new request`,
      offer_sent: `${actor} offered to help`,
      offer_accepted: `${actor} accepted an offer`,
      session_started: `${actor} started a session`,
      session_completed: `${actor} completed a session`,
    };

    return {
      id: `evt-${Date.now()}-${Math.random()}`,
      type,
      timestamp: new Date(),
      data,
      message: messages[type],
    };
  }

  // Event listener pattern for real-time updates
  addEventListener(listener: (event: DemoEvent) => void) {
    this.eventListeners.push(listener);
    return () => {
      this.eventListeners = this.eventListeners.filter((l) => l !== listener);
    };
  }

  private notifyListeners(event: DemoEvent) {
    this.eventListeners.forEach((listener) => listener(event));
  }

  // CRUD Operations
  getAllRequests(filters?: {
    tags?: string[];
    urgency?: string[];
    mode?: string[];
    duration?: [number, number];
  }): DemoRequest[] {
    let requests = Array.from(this.requests.values());

    if (filters) {
      if (filters.tags?.length) {
        requests = requests.filter((r) =>
          r.tags.some((tag) => filters.tags!.includes(tag))
        );
      }
      if (filters.urgency?.length) {
        requests = requests.filter((r) =>
          filters.urgency!.includes(r.urgency)
        );
      }
      if (filters.mode?.length) {
        requests = requests.filter((r) => filters.mode!.includes(r.mode));
      }
      if (filters.duration) {
        requests = requests.filter(
          (r) =>
            r.duration >= filters.duration![0] &&
            r.duration <= filters.duration![1]
        );
      }
    }

    return requests.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  getRequestById(id: string): DemoRequest | undefined {
    return this.requests.get(id);
  }

  createOffer(requestId: string, message: string): DemoOffer {
    const offer: DemoOffer = {
      id: `offer-${Date.now()}-${Math.random()}`,
      requestId,
      helper: generateUser(),
      message,
      availability: "Available now",
      createdAt: new Date(),
      status: "pending",
    };

    const request = this.requests.get(requestId);
    if (request) {
      request.offers.push(offer);
    }

    this.offers.set(offer.id, offer);

    // Create event
    const event = this.createEvent("offer_sent", offer.helper.name, {
      offer,
      request,
    });
    this.events.unshift(event);
    this.notifyListeners(event);

    return offer;
  }

  getRecentEvents(limit: number = 20): DemoEvent[] {
    return this.events.slice(0, limit);
  }

  getStats(): DemoStats {
    const requests = Array.from(this.requests.values());
    return {
      totalRequests: requests.length,
      activeRequests: requests.filter((r) => r.status === "open").length,
      totalOffers: this.offers.size,
      activeSessions: requests.filter((r) => r.status === "in-progress")
        .length,
      completedSessions: requests.filter((r) => r.status === "completed")
        .length,
      availableHelpers: Math.floor(Math.random() * 20) + 30, // 30-50
    };
  }
}

// Singleton instance
export const demoService = new DemoService();
