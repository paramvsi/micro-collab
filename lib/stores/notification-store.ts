/**
 * Notification Store
 * Manages notifications with Zustand + localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import type { Notification } from '../services/types';

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;

  // Actions
  addNotification: (notification: Omit<Notification, 'id' | 'created_at'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,

      /**
       * Add new notification
       */
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: nanoid(),
          read: false,
          created_at: new Date().toISOString()
        };

        set((state) => ({
          notifications: [newNotification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        }));
      },

      /**
       * Mark notification as read
       */
      markAsRead: (id) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          if (!notification || notification.read) {
            return state;
          }

          return {
            notifications: state.notifications.map(n =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: Math.max(0, state.unreadCount - 1)
          };
        });
      },

      /**
       * Mark all notifications as read
       */
      markAllAsRead: () => {
        set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        }));
      },

      /**
       * Remove notification
       */
      removeNotification: (id) => {
        set((state) => {
          const notification = state.notifications.find(n => n.id === id);
          const wasUnread = notification && !notification.read;

          return {
            notifications: state.notifications.filter(n => n.id !== id),
            unreadCount: wasUnread
              ? Math.max(0, state.unreadCount - 1)
              : state.unreadCount
          };
        });
      },

      /**
       * Clear all notifications
       */
      clearAll: () => {
        set({
          notifications: [],
          unreadCount: 0
        });
      }
    }),
    {
      name: 'microcollab-notifications',
      version: 1
    }
  )
);

/**
 * Helper function to create typed notifications
 */
export const createNotification = {
  newOffer: (requestTitle: string, requestId: string): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'new_offer',
    title: 'New Offer Received',
    content: `Someone offered to help with "${requestTitle}"`,
    link: `/requests/${requestId}`,
    read: false
  }),

  offerAccepted: (requestTitle: string, sessionId: string): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'offer_accepted',
    title: 'Offer Accepted!',
    content: `Your offer for "${requestTitle}" was accepted`,
    link: `/sessions/${sessionId}`,
    read: false
  }),

  offerDeclined: (requestTitle: string): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'offer_declined',
    title: 'Offer Declined',
    content: `Your offer for "${requestTitle}" was declined`,
    read: false
  }),

  sessionStarting: (requestTitle: string, sessionId: string, minutesUntil: number): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'session_starting',
    title: 'Session Starting Soon',
    content: `Your session "${requestTitle}" starts in ${minutesUntil} minutes`,
    link: `/sessions/${sessionId}`,
    read: false
  }),

  sessionCompleted: (requestTitle: string, sessionId: string): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'session_completed',
    title: 'Session Completed',
    content: `Session "${requestTitle}" has been completed`,
    link: `/sessions/${sessionId}`,
    read: false
  }),

  feedbackReceived: (rating: number, fromName: string): Omit<Notification, 'id' | 'created_at'> => ({
    user_id: '', // Will be set by caller
    type: 'feedback_received',
    title: 'New Feedback',
    content: `${fromName} rated you ${rating} stars!`,
    link: '/profile',
    read: false
  })
};
