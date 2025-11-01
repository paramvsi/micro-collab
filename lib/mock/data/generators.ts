/**
 * Mock Data Generators using @faker-js/faker
 *
 * Generates realistic seed data for development and demo mode
 */

import { faker } from '@faker-js/faker';
import { nanoid } from 'nanoid';
import type { User, Request, Offer, Session, Message, Notification } from '@/lib/services/types';

/**
 * Popular tech skills for MicroCollab
 */
const TECH_SKILLS = [
  'React', 'TypeScript', 'Node.js', 'Python', 'JavaScript',
  'Vue.js', 'Angular', 'Next.js', 'Express', 'Django',
  'FastAPI', 'PostgreSQL', 'MongoDB', 'Redis', 'Docker',
  'Kubernetes', 'AWS', 'Azure', 'GCP', 'CI/CD',
  'Git', 'GraphQL', 'REST API', 'WebSockets', 'Testing',
  'TailwindCSS', 'UI/UX', 'Figma', 'React Native', 'Flutter',
  'Go', 'Rust', 'Java', 'Spring Boot', 'Laravel'
];

/**
 * Request templates for realistic problems
 */
const REQUEST_TEMPLATES = [
  {
    title: 'Need help debugging React performance issue',
    description: 'My React app is experiencing slow renders on the dashboard page. I suspect it\'s related to unnecessary re-renders but can\'t pinpoint the exact cause. Would love help profiling and optimizing.',
    tags: ['React', 'Performance', 'JavaScript'],
    duration_hours: 2,
    urgency: 'normal' as const
  },
  {
    title: 'Refactor Node.js API to use TypeScript',
    description: 'I have an Express API written in JavaScript and want to migrate it to TypeScript. Need guidance on best practices, setting up types, and handling async/await patterns properly.',
    tags: ['Node.js', 'TypeScript', 'Express'],
    duration_hours: 3,
    urgency: 'low' as const
  },
  {
    title: 'URGENT: Production database migration failing',
    description: 'Our PostgreSQL migration is failing in production but works locally. Getting constraint violation errors. Need immediate help to debug and fix before our deployment window closes.',
    tags: ['PostgreSQL', 'Database', 'DevOps'],
    duration_hours: 1,
    urgency: 'critical' as const
  },
  {
    title: 'Set up CI/CD pipeline with GitHub Actions',
    description: 'Want to automate testing and deployment for our Next.js app. Need help configuring GitHub Actions for running tests, type-checking, and deploying to Vercel.',
    tags: ['CI/CD', 'GitHub', 'Next.js', 'DevOps'],
    duration_hours: 2,
    urgency: 'normal' as const
  },
  {
    title: 'Design system architecture for microservices',
    description: 'Planning to split our monolith into microservices. Need architectural guidance on service boundaries, communication patterns, and deployment strategy.',
    tags: ['Architecture', 'Microservices', 'System Design'],
    duration_hours: 4,
    urgency: 'low' as const
  },
  {
    title: 'Implement authentication with Supabase',
    description: 'Adding auth to our React app using Supabase. Need help with OAuth providers, protected routes, and Row Level Security policies.',
    tags: ['Supabase', 'React', 'Authentication'],
    duration_hours: 2,
    urgency: 'normal' as const
  },
  {
    title: 'Optimize SQL queries for better performance',
    description: 'Our dashboard is loading slowly due to inefficient queries. Need help analyzing query plans, adding indexes, and optimizing complex joins.',
    tags: ['SQL', 'PostgreSQL', 'Performance'],
    duration_hours: 2,
    urgency: 'normal' as const
  },
  {
    title: 'Write E2E tests with Playwright',
    description: 'Want to add comprehensive E2E testing to our app. Need guidance on best practices, page object patterns, and CI integration.',
    tags: ['Testing', 'Playwright', 'QA'],
    duration_hours: 3,
    urgency: 'low' as const
  },
  {
    title: 'Responsive design not working on mobile',
    description: 'Our site looks great on desktop but breaks on mobile devices. Need help fixing layout issues and implementing proper responsive patterns.',
    tags: ['CSS', 'Responsive Design', 'UI/UX'],
    duration_hours: 2,
    urgency: 'normal' as const
  },
  {
    title: 'Deploy Docker containers to AWS ECS',
    description: 'Need help containerizing our application and deploying to AWS ECS. Want to set up load balancing and auto-scaling.',
    tags: ['Docker', 'AWS', 'DevOps'],
    duration_hours: 3,
    urgency: 'normal' as const
  }
];

/**
 * Generate a random user
 */
export const generateUser = (overrides?: Partial<User>): User => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const skillCount = faker.number.int({ min: 3, max: 8 });
  const skills = faker.helpers.arrayElements(TECH_SKILLS, skillCount);

  return {
    id: nanoid(),
    email: faker.internet.email({ firstName, lastName }).toLowerCase(),
    name: `${firstName} ${lastName}`,
    bio: faker.lorem.sentences(2),
    skills,
    timezone: faker.location.timeZone(),
    availability_status: faker.helpers.arrayElement(['available', 'busy', 'offline']),
    avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${firstName}${lastName}`,
    rating: parseFloat(faker.number.float({ min: 3.5, max: 5.0 }).toFixed(1)),
    sessions_completed: faker.number.int({ min: 0, max: 50 }),
    hourly_rate: faker.number.int({ min: 25, max: 150 }),
    role: faker.helpers.arrayElement(['requester', 'helper', 'both']),
    created_at: faker.date.past({ years: 1 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate a random request
 */
export const generateRequest = (userId: string, overrides?: Partial<Request>): Request => {
  const template = faker.helpers.arrayElement(REQUEST_TEMPLATES);
  const useTemplate = faker.datatype.boolean();

  return {
    id: nanoid(),
    title: useTemplate ? template.title : faker.lorem.sentence(),
    description: useTemplate ? template.description : faker.lorem.paragraphs(2),
    tags: useTemplate ? template.tags : faker.helpers.arrayElements(TECH_SKILLS, faker.number.int({ min: 2, max: 5 })),
    duration_hours: useTemplate ? template.duration_hours : faker.number.int({ min: 1, max: 4 }),
    urgency: useTemplate ? template.urgency : faker.helpers.arrayElement(['low', 'normal', 'critical']),
    mode: faker.helpers.arrayElement(['async', 'live']),
    budget: faker.datatype.boolean() ? faker.number.int({ min: 50, max: 500 }) : undefined,
    currency: 'USD',
    budget_type: faker.helpers.arrayElement(['hourly', 'fixed']),
    status: 'open',
    preferred_time: faker.datatype.boolean() ? faker.date.future().toISOString() : undefined,
    timezone: faker.location.timeZone(),
    created_by: userId,
    created_at: faker.date.recent({ days: 7 }).toISOString(),
    updated_at: faker.date.recent({ days: 1 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate a random offer
 */
export const generateOffer = (requestId: string, helperId: string, overrides?: Partial<Offer>): Offer => {
  const messages = [
    'I have extensive experience with this tech stack and would love to help. I can start right away.',
    'I\'ve dealt with similar issues before. Let\'s hop on a call and I can walk you through the solution.',
    'This is right up my alley! I\'ve solved this exact problem multiple times. Happy to share my approach.',
    'I have a few hours available today and this sounds interesting. I can help you debug and fix this.',
    'I\'d be happy to pair program with you on this. I have experience with these technologies.'
  ];

  return {
    id: nanoid(),
    request_id: requestId,
    offered_by: helperId,
    message: faker.helpers.arrayElement(messages),
    proposed_time: faker.datatype.boolean() ? faker.date.soon({ days: 3 }).toISOString() : undefined,
    proposed_rate: faker.number.int({ min: 30, max: 120 }),
    estimated_completion: faker.datatype.boolean() ? `${faker.number.int({ min: 1, max: 4 })} hours` : undefined,
    status: 'pending',
    created_at: faker.date.recent({ days: 2 }).toISOString(),
    updated_at: faker.date.recent({ days: 1 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate a random session
 */
export const generateSession = (
  requestId: string,
  offerId: string,
  helperId: string,
  requesterId: string,
  overrides?: Partial<Session>
): Session => {
  const status = faker.helpers.arrayElement(['scheduled', 'active', 'completed', 'cancelled']);
  const scheduledStart = faker.date.recent({ days: 7 }).toISOString();

  return {
    id: nanoid(),
    request_id: requestId,
    offer_id: offerId,
    helper_id: helperId,
    requester_id: requesterId,
    status,
    scheduled_start: scheduledStart,
    actual_start: status !== 'scheduled' ? scheduledStart : undefined,
    end_time: status === 'completed' ? faker.date.recent({ days: 1 }).toISOString() : undefined,
    duration_minutes: status === 'completed' ? faker.number.int({ min: 30, max: 240 }) : undefined,
    notes: status === 'completed' ? faker.lorem.paragraph() : undefined,
    created_at: faker.date.recent({ days: 7 }).toISOString(),
    updated_at: faker.date.recent({ days: 1 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate a random message
 */
export const generateMessage = (sessionId: string, senderId: string, overrides?: Partial<Message>): Message => {
  const messages = [
    'Hey! Thanks for accepting my offer. When would be a good time to start?',
    'Sure, I can share my screen and walk you through the solution.',
    'Let me check the code... okay I see the issue now.',
    'Have you tried running the tests? That might give us more clues.',
    'This is a common pattern. Let me show you the best approach.',
    'Great! That fixed it. Let\'s test it to make sure everything works.',
    'Do you have any other questions about this implementation?'
  ];

  return {
    id: nanoid(),
    session_id: sessionId,
    sender_id: senderId,
    content: faker.helpers.arrayElement(messages),
    type: 'text',
    created_at: faker.date.recent({ days: 1 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate a random notification
 */
export const generateNotification = (userId: string, overrides?: Partial<Notification>): Notification => {
  const types = [
    {
      type: 'new_offer' as const,
      title: 'New Offer Received',
      content: 'Someone offered to help with your request!'
    },
    {
      type: 'offer_accepted' as const,
      title: 'Offer Accepted',
      content: 'Your offer was accepted! Time to collaborate.'
    },
    {
      type: 'session_starting' as const,
      title: 'Session Starting Soon',
      content: 'Your session starts in 15 minutes.'
    },
    {
      type: 'feedback_received' as const,
      title: 'New Feedback',
      content: 'You received 5-star feedback!'
    }
  ];

  const notification = faker.helpers.arrayElement(types);

  return {
    id: nanoid(),
    user_id: userId,
    type: notification.type,
    title: notification.title,
    content: notification.content,
    link: faker.datatype.boolean() ? `/requests/${nanoid()}` : undefined,
    read: faker.datatype.boolean(),
    created_at: faker.date.recent({ days: 3 }).toISOString(),
    ...overrides
  };
};

/**
 * Generate seed data for initial load
 */
export const generateSeedData = () => {
  // Generate 10 users
  const users: User[] = Array.from({ length: 10 }, () => generateUser());

  // Generate 20 requests from various users
  const requests: Request[] = users.flatMap(user =>
    Array.from({ length: faker.number.int({ min: 1, max: 3 }) }, () =>
      generateRequest(user.id)
    )
  ).slice(0, 20);

  // Generate 15 offers for requests
  const offers: Offer[] = requests.flatMap(request => {
    const offerCount = faker.number.int({ min: 0, max: 3 });
    const helpers = faker.helpers.arrayElements(
      users.filter(u => u.id !== request.created_by),
      offerCount
    );
    return helpers.map(helper => generateOffer(request.id, helper.id));
  });

  // Generate 5 sessions from accepted offers
  const acceptedOffers = faker.helpers.arrayElements(offers, 5);
  const sessions: Session[] = acceptedOffers.map(offer => {
    const request = requests.find(r => r.id === offer.request_id)!;
    return generateSession(
      request.id,
      offer.id,
      offer.offered_by,
      request.created_by
    );
  });

  // Generate 10 messages for active/completed sessions
  const messages: Message[] = sessions.flatMap(session => {
    const messageCount = faker.number.int({ min: 3, max: 8 });
    return Array.from({ length: messageCount }, (_, i) => {
      const senderId = i % 2 === 0 ? session.helper_id : session.requester_id;
      return generateMessage(session.id, senderId);
    });
  });

  // Generate 10 notifications for users
  const notifications: Notification[] = users.flatMap(user =>
    Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () =>
      generateNotification(user.id)
    )
  ).slice(0, 10);

  return {
    users,
    requests,
    offers,
    sessions,
    messages,
    notifications
  };
};
