import axios from "axios";
import { create } from "zustand";

export const useDoctorStore = create((set, get) => ({
  doctors: [],
  selectedDoctor: null,
  specialityFilter: "all",
  isLoading: false,
  error: null,

  fetchDoctors: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await axios.get("/api/doctors");
      set({ doctors: data.doctors || [], isLoading: false });
    } catch (error) {
      set({ error: "Failed to load doctors", isLoading: false });
    }
  },

  fetchDoctorBySlug: async (slug) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await axios.get(`/api/doctors/${slug}`);
      set({ selectedDoctor: data.doctor, isLoading: false });
      return data.doctor;
    } catch (error) {
      set({ error: "Doctor not found", isLoading: false });
      return null;
    }
  },

  setSpecialityFilter: (specialityFilter) => {
    set({ specialityFilter });
  },
  filteredDoctors: () => {
    const { doctors, specialityFilter } = get();
    if (specialityFilter === "all") return doctors;
    return doctors.filter((doctor) => doctor.specialty === specialityFilter);
  },

  specialities: () => {
    const { doctors } = get();
    return [...new Set(doctors.map((doctor) => doctor.specialty))].sort();
  },
}));
