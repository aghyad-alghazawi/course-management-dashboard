"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { CourseForm } from "@/components/course-form";
import { CourseTable } from "@/components/course-table";
import { useCourse } from "@/lib/context/course-context";
import { Course, CourseFormData } from "@/lib/types";
import { Search, Loader2, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

type SortDirection = "asc" | "desc" | null;
type SortField = "title" | "instructorName" | null;

export function Dashboard() {
  const { 
    courses, 
    addCourse, 
    editCourse, 
    deleteCourse, 
    searchCourses,
    loading,
    error,
    refreshCourses
  } = useCourse();
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);

  const filteredCourses = searchQuery
    ? searchCourses(searchQuery)
    : courses;

  const sortedCourses = [...filteredCourses].sort((a, b) => {
    if (!sortField || !sortDirection) return 0;
    
    const aValue = a[sortField].toLowerCase();
    const bValue = b[sortField].toLowerCase();
    
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortField(null);
        setSortDirection(null);
      }
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleAddCourse = async (data: CourseFormData) => {
    try {
      await addCourse(data);
      setIsAddDialogOpen(false);
    } catch {
      // Error is handled by the context with toast
    }
  };

  const handleEditCourse = (course: Course) => {
    setSelectedCourse(course);
    setIsEditDialogOpen(true);
  };

  const handleUpdateCourse = async (data: CourseFormData) => {
    if (selectedCourse) {
      try {
        await editCourse(selectedCourse.id, data);
        setIsEditDialogOpen(false);
        setSelectedCourse(null);
      } catch {
        // Error is handled by the context with toast
      }
    }
  };

  const handleDeleteCourse = async (id: string) => {
    try {
      await deleteCourse(id);
      setIsDeleteDialogOpen(false);
    } catch {
      // Error is handled by the context with toast
    }
  };

  return (
    <main className="container mx-auto my-4 py-10 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle>Course Management Dashboard</CardTitle>
            <div className="flex items-center gap-2 justify-between w-full sm:w-auto">
              <Button 
                variant="outline" 
                onClick={refreshCourses}
                disabled={loading}
                aria-label="Refresh course list"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" aria-hidden="true" />
                ) : null}
                Refresh
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button 
                    aria-label="Add new course"
                  >
                    Add Course
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Course</DialogTitle>
                  </DialogHeader>
                  <CourseForm onSubmit={handleAddCourse} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6" role="alert">
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="relative mb-8">
            <Label htmlFor="search" className="sr-only">Search courses</Label>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
            <Input
              id="search"
              placeholder="Search courses by title or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {loading ? (
            <div 
              className="flex justify-center items-center h-64"
              role="status"
              aria-label="Loading courses"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            </div>
          ) : (
            <CourseTable
              courses={sortedCourses}
              onEdit={handleEditCourse}
              onDelete={(id) => {
                setSelectedCourse(courses.find((c) => c.id === id) || null);
                setIsDeleteDialogOpen(true);
              }}
              sortField={sortField}
              sortDirection={sortDirection}
              onSort={handleSort}
            />
          )}
        </CardContent>
      </Card>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Course</DialogTitle>
          </DialogHeader>
          {selectedCourse && (
            <CourseForm
              initialData={selectedCourse}
              onSubmit={handleUpdateCourse}
              onCancel={() => {
                setIsEditDialogOpen(false);
                setSelectedCourse(null);
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              course.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedCourse && handleDeleteCourse(selectedCourse.id)}
              className="bg-background border-[1.5px] border-destructive text-destructive hover:bg-destructive hover:text-background"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
} 