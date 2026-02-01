'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    Calendar, Clock, User, Stethoscope, ChevronLeft,
    AlertCircle, CheckCircle2
} from 'lucide-react';
import { appointmentsApi } from '@/lib/modules-api';
import api from '@/lib/api';

interface Doctor {
    id: string;
    user: { name: string };
    department: { name: string };
}

interface Patient {
    id: string;
    patientId: string;
    name: string;
    phone: string;
}

export default function NewAppointmentPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [patients, setPatients] = useState<Patient[]>([]);
    const [slots, setSlots] = useState<string[]>([]);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    // Form state
    const [formData, setFormData] = useState({
        patientId: '',
        doctorId: '',
        date: new Date().toISOString().split('T')[0],
        startTime: '',
        type: 'CONSULTATION' as 'CONSULTATION' | 'FOLLOW_UP' | 'PROCEDURE' | 'LAB' | 'RADIOLOGY',
        reason: '',
        notes: '',
    });

    useEffect(() => {
        fetchDoctors();
        fetchPatients();
    }, []);

    useEffect(() => {
        if (formData.doctorId && formData.date) {
            fetchSlots();
        }
    }, [formData.doctorId, formData.date]);

    const fetchDoctors = async () => {
        try {
            const response = await appointmentsApi.getDoctors();
            setDoctors(response.data.data);
        } catch (err) {
            console.error('Failed to fetch doctors:', err);
        }
    };

    const fetchPatients = async () => {
        try {
            const response = await api.get('/patients', { params: { limit: 100 } });
            setPatients(response.data.data);
        } catch (err) {
            console.error('Failed to fetch patients:', err);
        }
    };

    const fetchSlots = async () => {
        try {
            const response = await appointmentsApi.getAvailableSlots(formData.doctorId, formData.date);
            setSlots(response.data.data);
        } catch (err) {
            console.error('Failed to fetch slots:', err);
            setSlots([]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await appointmentsApi.create(formData);
            setSuccess(true);
            setTimeout(() => {
                router.push('/appointments');
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.error?.message || 'Failed to create appointment');
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    if (success) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">Appointment Booked!</h2>
                    <p className="text-gray-500">Redirecting to appointments...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => router.back()}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <ChevronLeft className="w-5 h-5" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">New Appointment</h1>
                    <p className="text-gray-500">Book a new patient appointment</p>
                </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 p-6 space-y-6">
                {error && (
                    <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-700">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Patient Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <User className="w-4 h-4 inline mr-2" />
                        Select Patient *
                    </label>
                    <select
                        required
                        value={formData.patientId}
                        onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">-- Select Patient --</option>
                        {patients.map((patient) => (
                            <option key={patient.id} value={patient.id}>
                                {patient.name} ({patient.patientId}) - {patient.phone}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Doctor Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Stethoscope className="w-4 h-4 inline mr-2" />
                        Select Doctor *
                    </label>
                    <select
                        required
                        value={formData.doctorId}
                        onChange={(e) => setFormData({ ...formData, doctorId: e.target.value, startTime: '' })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    >
                        <option value="">-- Select Doctor --</option>
                        {doctors.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>
                                Dr. {doctor.user.name} - {doctor.department.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Date and Type */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            <Calendar className="w-4 h-4 inline mr-2" />
                            Date *
                        </label>
                        <input
                            type="date"
                            required
                            min={new Date().toISOString().split('T')[0]}
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value, startTime: '' })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Appointment Type *
                        </label>
                        <select
                            required
                            value={formData.type}
                            onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="CONSULTATION">New Consultation</option>
                            <option value="FOLLOW_UP">Follow-up</option>
                            <option value="PROCEDURE">Procedure</option>
                        </select>
                    </div>
                </div>

                {/* Time Slots */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        <Clock className="w-4 h-4 inline mr-2" />
                        Select Time Slot *
                    </label>
                    {!formData.doctorId || !formData.date ? (
                        <p className="text-sm text-gray-500">Please select a doctor and date first</p>
                    ) : slots.length === 0 ? (
                        <p className="text-sm text-red-500">No available slots for this date</p>
                    ) : (
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {slots.map((slot) => (
                                <button
                                    key={slot}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, startTime: slot })}
                                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all ${formData.startTime === slot
                                        ? 'bg-teal-500 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                >
                                    {formatTime(slot)}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Reason */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Reason for Visit
                    </label>
                    <input
                        type="text"
                        value={formData.reason}
                        onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                        placeholder="e.g., General checkup, Fever, Follow-up..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                {/* Notes */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Additional Notes
                    </label>
                    <textarea
                        value={formData.notes}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        placeholder="Any additional information..."
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                    />
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !formData.startTime}
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-xl hover:from-teal-600 hover:to-cyan-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                Booking...
                            </span>
                        ) : (
                            'Book Appointment'
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
