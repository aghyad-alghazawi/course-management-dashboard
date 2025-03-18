"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { Course, CourseFormData } from "@/lib/types";
import { mockCourses } from "@/lib/mock-data";
import { toast } from "sonner";

// Define the shape of our context
interface CourseContextType {
  courses: Course[];
  loading: boolean;
  error: string | null;
  addCourse: (course: CourseFormData) => Promise<void>;
  editCourse: (id: string, course: CourseFormData) => Promise<void>;
  deleteCourse: (id: string) => Promise<void>;
  searchCourses: (query: string) => Course[];
  refreshCourses: () => Promise<void>;
}

// Create the context with a default value
const CourseContext = createContext<CourseContextType | undefined>(undefined);

// Custom hook to use the course context
export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
}

// Provider component that wraps our app and provides course data
export function CourseProvider({ children }: { children: React.ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(mockCourses);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API delay
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  // Add a new course
  const addCourse = useCallback(async (course: CourseFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await delay(1000);
      const newCourse: Course = {
        id: Math.random().toString(36).substr(2, 9),
        ...course,
      };
      setCourses(prev => [...prev, newCourse]);
      toast.success("Course added successfully");
    } catch (err) {
      setError("Failed to add course");
      toast.error("Failed to add course");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Edit an existing course
  const editCourse = useCallback(async (id: string, course: CourseFormData) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await delay(1000);
      setCourses(prev =>
        prev.map(c => (c.id === id ? { ...c, ...course } : c))
      );
      toast.success("Course updated successfully");
    } catch (err) {
      setError("Failed to edit course");
      toast.error("Failed to edit course");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Delete a course
  const deleteCourse = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await delay(1000);
      setCourses(prev => prev.filter(c => c.id !== id));
      toast.success("Course deleted successfully");
    } catch (err) {
      setError("Failed to delete course");
      toast.error("Failed to delete course");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Search courses by title or instructor name
  const searchCourses = useCallback((query: string) => {
    const searchTerm = query.toLowerCase();
    return courses.filter(
      course =>
        course.title.toLowerCase().includes(searchTerm) ||
        course.instructorName.toLowerCase().includes(searchTerm)
    );
  }, [courses]);

  // Refresh courses (simulate fetching from API)
  const refreshCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Simulate API call
      await delay(1000);
      setCourses(mockCourses);
      toast.success("Courses refreshed successfully");
    } catch (err) {
      setError("Failed to refresh courses");
      toast.error("Failed to refresh courses");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Value object to be provided to consumers
  const value = {
    courses,
    loading,
    error,
    addCourse,
    editCourse,
    deleteCourse,
    searchCourses,
    refreshCourses,
  };

  return (
    <CourseContext.Provider value={value}>
      {children}
    </CourseContext.Provider>
  );
} 