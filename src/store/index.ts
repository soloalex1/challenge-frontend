import { create } from "zustand";
import { devtools, persist, createJSONStorage } from "zustand/middleware";

import {
  SearchFilters,
  VolumeData,
  VolumeQuery,
  Price,
  Format,
} from "../types";

interface BookStore {
  query: string;
  isLoading: boolean;
  volumes: VolumeQuery;
  filteredVolumes: VolumeData[];
  suggestions: VolumeData[];
  pagination: {
    currentPage: number;
    itemsPerPage: number;
  };
  filters: SearchFilters;

  shelves: {
    action: VolumeData[];
    adventure: VolumeData[];
    fiction: VolumeData[];
  };

  setQuery(query: string): void;
  setLoading(isLoading: boolean): void;
  setVolumes(volumes: VolumeQuery, resetPage?: boolean): void;
  setFilteredVolumes(volumes: VolumeData[]): void;
  setSuggestions(suggestions: VolumeData[]): void;
  setCurrentPage(page: number): void;
  setItemsPerPage(items: number): void;
  setPriceFilters(price: Price): void;
  setFormatFilters(label: keyof Format, value: boolean): void;
  setAvailabilityFilters(value: boolean): void;
  resetFilters(): void;
  setShelf(shelf: keyof BookStore["shelves"], volumes: VolumeData[]): void;
}

const initialState = {
  query: "",
  isLoading: false,
  volumes: {
    totalItems: 0,
    items: [],
  },
  filteredVolumes: [],
  suggestions: [],
  pagination: {
    currentPage: 1,
    itemsPerPage: 40,
  },
  filters: {
    price: {},
    availableFormats: {
      epub: false,
      pdf: false,
    },
    availableItems: false,
  },
  shelves: {
    action: [],
    adventure: [],
    fiction: [],
  },
};

const useStore = create<BookStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setQuery: (query) => set(() => ({ query })),

        setLoading: (isLoading) => set(() => ({ isLoading })),

        setVolumes: (volumes, resetPage = false) =>
          set((state) => ({
            volumes,
            pagination: {
              ...state.pagination,
              currentPage: resetPage ? 1 : state.pagination.currentPage,
            },
          })),

        setFilteredVolumes: (volumes) =>
          set(() => ({ filteredVolumes: volumes })),

        setSuggestions: (suggestions) => set(() => ({ suggestions })),

        setCurrentPage: (page: number) =>
          set((state) => ({
            pagination: { ...state.pagination, currentPage: page },
          })),

        setItemsPerPage: (itemsPerPage: number) =>
          set((state) => ({
            pagination: { ...state.pagination, itemsPerPage },
          })),

        setPriceFilters: (price: Price) =>
          set((state) => ({
            filters: {
              ...state.filters,
              price: {
                ...state.filters.price,
                ...price,
              },
            },
          })),

        setFormatFilters: (label, value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              availableFormats: {
                ...state.filters.availableFormats,
                [label]: value,
              },
            },
          })),

        setAvailabilityFilters: (value) =>
          set((state) => ({
            filters: {
              ...state.filters,
              availableItems: value,
            },
          })),

        resetFilters: () => {
          set(() => ({
            filters: initialState.filters,
          }));
        },
        setShelf: (shelf, volumes) =>
          set((state) => ({
            shelves: {
              ...state.shelves,
              [shelf]: volumes,
            },
          })),
      }),
      {
        name: "booksStore",
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ query: state.query, shelves: state.shelves }),
      }
    )
  )
);

export default useStore;
