import { DOCTOR_SEED } from "@/assets/doctor";
import { create } from "zustand";

export const useDoctorStore = create((set, get) => ({
  doctors: [],
  specialityFilter: "all",
  isLoading: false,
  error: null,

  fetchDoctors: async () => {
    set({ isLoading: true, error: null });
    set({ doctors: DOCTOR_SEED || [], isLoading: false });
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
