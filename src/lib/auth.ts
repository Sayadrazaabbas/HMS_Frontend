'use client';

import { authApi } from './api';

export interface User {
    id: string;
    email: string;
    name: string;
    phone: string | null;
    avatar: string | null;
    role: {
        id: string;
        name: string;
        displayName: string;
        permissions: string[];
    };
}

export const authService = {
    /**
     * Login user and store tokens
     */
    /**
     * Login user and store tokens (MOCKED)
     */
    async login(email: string, password: string): Promise<User> {
        // Mock response
        const user: User = {
            id: 'mock-user-1',
            email: email,
            name: 'Test Administrator',
            phone: '9876543210',
            avatar: null,
            role: {
                id: 'role-1',
                name: 'admin',
                displayName: 'Administrator',
                permissions: ['*']
            }
        };

        // Store mock tokens
        localStorage.setItem('accessToken', 'mock-access-token');
        localStorage.setItem('refreshToken', 'mock-refresh-token');
        localStorage.setItem('user', JSON.stringify(user));

        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));

        return user;
    },

    /**
     * Get current user from localStorage or API
     */
    async getCurrentUser(): Promise<User | null> {
        // First check localStorage
        const userStr = localStorage.getItem('user');
        if (userStr) {
            return JSON.parse(userStr);
        }

        // Return null if not in storage (force login)
        return null;
    },

    /**
     * Logout user and clear tokens
     */
    logout(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
    },

    /**
     * Check if user is authenticated
     */
    isAuthenticated(): boolean {
        if (typeof window === 'undefined') return false;
        return !!localStorage.getItem('accessToken');
    },

    /**
     * Get stored user
     */
    getUser(): User | null {
        if (typeof window === 'undefined') return null;
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * Check if user has permission
     */
    hasPermission(permission: string): boolean {
        const user = this.getUser();
        if (!user) return false;

        // Admin has all permissions
        if (user.role.name === 'admin') return true;

        // Check specific permission
        return user.role.permissions.includes(permission) ||
            user.role.permissions.includes('*');
    },

    /**
     * Check if user has role
     */
    hasRole(role: string): boolean {
        const user = this.getUser();
        return user?.role.name === role;
    },
};
