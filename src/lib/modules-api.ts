import api from './api';

// Appointments API
export const appointmentsApi = {
    getAll: (page = 1, limit = 10, filters?: { date?: string; doctorId?: string; status?: string }) =>
        api.get('/appointments', { params: { page, limit, ...filters } }),

    getById: (id: string) => api.get(`/appointments/${id}`),

    getTodayByDoctor: (doctorId: string) => api.get(`/appointments/today/${doctorId}`),

    getAvailableSlots: (doctorId: string, date: string) =>
        api.get('/appointments/slots', { params: { doctorId, date } }),

    getDoctors: () => api.get('/appointments/doctors'),

    create: (data: {
        patientId: string;
        doctorId: string;
        date: string;
        startTime: string;
        type: 'NEW' | 'FOLLOWUP' | 'EMERGENCY';
        reason?: string;
        notes?: string;
    }) => api.post('/appointments', data),

    updateStatus: (id: string, status: string) =>
        api.patch(`/appointments/${id}/status`, { status }),

    update: (id: string, data: any) => api.put(`/appointments/${id}`, data),

    cancel: (id: string) => api.delete(`/appointments/${id}`),
};

// Billing API
export const billingApi = {
    getAll: (page = 1, limit = 10, filters?: { status?: string; patientId?: string }) =>
        api.get('/billing/invoices', { params: { page, limit, ...filters } }),

    getById: (id: string) => api.get(`/billing/invoices/${id}`),

    create: (data: any) => api.post('/billing/invoices', data),

    addPayment: (invoiceId: string, data: { amount: number; method: string; reference?: string }) =>
        api.post(`/billing/invoices/${invoiceId}/payments`, data),

    getServices: () => api.get('/billing/services'),
};

// Pharmacy API
export const pharmacyApi = {
    getMedicines: (page = 1, limit = 10, search?: string) =>
        api.get('/pharmacy/medicines', { params: { page, limit, search } }),

    getMedicineById: (id: string) => api.get(`/pharmacy/medicines/${id}`),

    getStock: () => api.get('/pharmacy/stock'),

    getLowStock: () => api.get('/pharmacy/stock/low'),

    dispenseMedicine: (data: { patientId: string; items: { medicineId: string; quantity: number }[] }) =>
        api.post('/pharmacy/dispense', data),

    getPrescriptions: (patientId?: string) =>
        api.get('/pharmacy/prescriptions', { params: { patientId } }),
};
