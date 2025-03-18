"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Course, CourseFormData } from "../types";
import { api } from "../api";

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

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshCourses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCourses();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshCourses();
  }, []);

  const addCourse = async (courseData: CourseFormData) => {
    try {
      setLoading(true);
      setError(null);
      const newCourse = await api.addCourse(courseData);
      setCourses([...courses, newCourse]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add course");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editCourse = async (id: string, courseData: CourseFormData) => {
    try {
      setLoading(true);
      setError(null);
      const updatedCourse = await api.updateCourse(id, courseData);
      setCourses(
        courses.map((course) =>
          course.id === id ? updatedCourse : course
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update course");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCourse = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await api.deleteCourse(id);
      setCourses(courses.filter((course) => course.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchCourses = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(lowercaseQuery) ||
        course.instructorName.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        loading,
        error,
        addCourse,
        editCourse,
        deleteCourse,
        searchCourses,
        refreshCourses,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (context === undefined) {
    throw new Error("useCourse must be used within a CourseProvider");
  }
  return context;
} 