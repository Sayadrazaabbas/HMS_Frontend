import axios from 'axios';

// MOCK API IMPLEMENTATION
// This replaces the actual Axios instance with a mock object for testing purposes
// when the backend is unavailable.

const mockDelay = 500;

const mockPatients = [
    {
        id: '1',
        patientId: 'PT-1001',
        name: 'John Doe',
        age: 30,
        gender: 'Male',
        phone: '1234567890',
        address: '123 Main St, New York',
        lastVisit: '2023-01-01',
        email: 'john@example.com',
        bloodGroup: 'O+',
        emergencyContact: 'Jane Doe (9876543210)'
    },
    {
        id: '2',
        patientId: 'PT-1002',
        name: 'Jane Smith',
        age: 25,
        gender: 'Female',
        phone: '0987654321',
        address: '456 Oak Ave, Los Angeles',
        lastVisit: '2023-01-05',
        email: 'jane@example.com',
        bloodGroup: 'A-',
        emergencyContact: 'John Smith (0987123456)'
    },
];

const mockAppointments = [
    {
        id: '1',
        appointmentNo: 'APT-1001',
        date: new Date().toISOString().split('T')[0],
        startTime: '10:00',
        tokenNo: 1,
        type: 'NEW',
        status: 'SCHEDULED',
        patient: {
            id: '1',
            patientId: 'PT-1001',
            name: 'John Doe',
            phone: '1234567890',
            gender: 'Male'
        },
        doctor: {
            id: 'd1',
            user: { name: 'Dr. Sarah Smith' },
            department: { name: 'Cardiology' }
        }
    },
    {
        id: '2',
        appointmentNo: 'APT-1002',
        date: new Date().toISOString().split('T')[0],
        startTime: '11:30',
        tokenNo: 2,
        type: 'FOLLOWUP',
        status: 'CHECKED_IN',
        patient: {
            id: '2',
            patientId: 'PT-1002',
            name: 'Jane Smith',
            phone: '0987654321',
            gender: 'Female'
        },
        doctor: {
            id: 'd2',
            user: { name: 'Dr. James Wilson' },
            department: { name: 'Neurology' }
        }
    },
];

const mockStats = {
    totalPatients: 125,
    todayAppointments: 12,
    pendingBills: 8,
    todayRevenue: 25000,
};

const mockInvoices = [
    {
        id: 'inv-1',
        invoiceNo: 'INV-2026-001',
        date: '2023-10-25',
        totalAmount: 1500,
        status: 'PAID',
        patient: { name: 'John Doe', patientId: 'PT-1001' }
    },
    {
        id: 'inv-2',
        invoiceNo: 'INV-2026-002',
        date: '2023-10-26',
        totalAmount: 2500,
        status: 'PENDING',
        patient: { name: 'Jane Smith', patientId: 'PT-1002' }
    }
];

const mockMedicines = [
    { id: 'm1', name: 'Paracetamol', brand: 'GSK', stock: 500, unit: 'Tablet', price: 5, expiryDate: '2025-12-01' },
    { id: 'm2', name: 'Amoxicillin', brand: 'Pfizer', stock: 200, unit: 'Capsule', price: 15, expiryDate: '2025-06-15' },
    { id: 'm3', name: 'Cetirizine', brand: 'Cipla', stock: 15, unit: 'Tablet', price: 2, expiryDate: '2024-10-20' },
];

const api = axios.create({
    baseURL: 'http://localhost:3001/api/v1',
});

// Mocking methods (using type assertion for mock overrides)
(api as any).get = async (url: string, config?: any): Promise<any> => {
    console.log(`[MOCK API] GET ${url}`, config?.params);
    await new Promise(resolve => setTimeout(resolve, mockDelay));

    if (url.includes('/dashboard/stats')) return { data: { data: mockStats } };
    if (url.includes('/dashboard/recent-patients')) return { data: { data: mockPatients.slice(0, 5) } };
    if (url.includes('/dashboard/today-appointments')) return { data: { data: mockAppointments } };

    if (url.includes('/patients')) return { data: { data: mockPatients, pagination: { total: 2, pages: 1, page: 1, limit: 10 } } };

    if (url.includes('/appointments/doctors')) return {
        data: {
            data: [
                { id: 'd1', user: { name: 'Dr. Sarah Smith' }, department: { name: 'Cardiology' } },
                { id: 'd2', user: { name: 'Dr. James Wilson' }, department: { name: 'Neurology' } }
            ]
        }
    };
    if (url.includes('/appointments')) return { data: { data: mockAppointments, pagination: { total: 2, pages: 1, page: 1, limit: 10 } } };

    if (url.includes('/billing/invoices')) return { data: { data: mockInvoices, pagination: { total: 2, pages: 1, page: 1, limit: 10 } } };

    if (url.includes('/pharmacy/medicines')) return { data: { data: mockMedicines, pagination: { total: 3, pages: 1, page: 1, limit: 10 } } };
    if (url.includes('/pharmacy/stock/low')) return { data: { data: mockMedicines.filter(m => m.stock < 20) } };

    return { data: { data: [] } };
};

(api as any).post = async (url: string, data: any): Promise<any> => {
    console.log(`[MOCK API] POST ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, mockDelay));

    if (url.includes('/auth/login')) {
        return {
            data: {
                data: {
                    user: {
                        id: 'mock-1',
                        name: 'Admin',
                        email: data.email,
                        role: { name: 'admin', displayName: 'Administrator', permissions: ['*'] }
                    },
                    accessToken: 'mock-token',
                    refreshToken: 'mock-refresh'
                }
            }
        };
    }

    return { data: { data: { ...data, id: `mock-new-${Date.now()}` }, message: 'Created successfully (MOCKED)' } };
};

(api as any).put = async (url: string, data: any): Promise<any> => {
    console.log(`[MOCK API] PUT ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, mockDelay));
    return { data: { data: { ...data }, message: 'Updated successfully (MOCKED)' } };
};

(api as any).patch = async (url: string, data: any): Promise<any> => {
    console.log(`[MOCK API] PATCH ${url}`, data);
    await new Promise(resolve => setTimeout(resolve, mockDelay));
    return { data: { data: { ...data }, message: 'Status updated (MOCKED)' } };
};

(api as any).delete = async (url: string): Promise<any> => {
    console.log(`[MOCK API] DELETE ${url}`);
    await new Promise(resolve => setTimeout(resolve, mockDelay));
    return { data: { message: 'Deleted successfully (MOCKED)' } };
};

export default api;

// Auth API
export const authApi = {
    login: (email: string, password: string) =>
        api.post('/auth/login', { email, password }),

    getCurrentUser: () => api.get('/auth/me'),

    logout: () => api.post('/auth/logout', {}),
};

// Dashboard API
export const dashboardApi = {
    getStats: () => api.get('/dashboard/stats'),
    getRecentPatients: (limit = 5) => api.get(`/dashboard/recent-patients?limit=${limit}`),
    getTodayAppointments: () => api.get('/dashboard/today-appointments'),
};

// Patients API
export const patientsApi = {
    getAll: (page = 1, limit = 10, search = '') =>
        api.get(`/patients?page=${page}&limit=${limit}${search ? `&search=${search}` : ''}`),

    getById: (id: string) => api.get(`/patients/${id}`),

    create: (data: any) => api.post('/patients', data),

    update: (id: string, data: any) => api.put(`/patients/${id}`, data),

    delete: (id: string) => api.delete(`/patients/${id}`),
};
