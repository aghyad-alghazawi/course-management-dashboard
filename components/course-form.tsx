"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFormData } from "@/lib/types";
import { ChevronUp, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  initialData?: CourseFormData;
  onCancel?: () => void;
}

/**
 * CourseForm Component
 * 
 * A form component for creating and editing courses. It provides a user interface
 * for inputting course details including title, description, instructor name, and duration.
 * The form includes validation and accessibility features.
 * 
 * Features:
 * - Input validation for required fields
 * - Duration input with increment/decrement controls
 * - Responsive design
 * - Accessibility support with ARIA labels
 * - Support for both create and edit modes
 * 
 * @example
 * ```tsx
 * // Create mode
 * <CourseForm onSubmit={handleAddCourse} />
 * 
 * // Edit mode
 * <CourseForm 
 *   initialData={existingCourse}
 *   onSubmit={handleUpdateCourse}
 *   onCancel={handleCancel}
 * />
 * ```
 */
export function CourseForm({ onSubmit, initialData, onCancel }: CourseFormProps) {
  // Initialize form state with initial data or empty values
  const [formData, setFormData] = useState<CourseFormData>(
    initialData || {
      title: "",
      description: "",
      instructorName: "",
      duration: 1,
    }
  );
  const incrementInterval = useRef<NodeJS.Timeout | undefined>(undefined);
  const decrementInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleDurationChange = (value: number) => {
    setFormData(prev => ({
      ...prev,
      duration: Math.max(1, value)
    }));
  };

  const startIncrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    handleDurationChange(formData.duration + 1);
    incrementInterval.current = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        duration: prev.duration + 1
      }));
    }, 150);
  };

  const startDecrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    handleDurationChange(Math.max(1, formData.duration - 1));
    decrementInterval.current = setInterval(() => {
      setFormData(prev => ({
        ...prev,
        duration: Math.max(1, prev.duration - 1)
      }));
    }, 150);
  };

  const stopIncrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (incrementInterval.current) {
      clearInterval(incrementInterval.current);
    }
  };

  const stopDecrement = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (decrementInterval.current) {
      clearInterval(decrementInterval.current);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardContent className="p-6">
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-label={initialData ? "Edit course form" : "Add new course form"}
        >
          {/* Title Input Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="title"
              id="title-label"
              className="text-sm font-medium"
            >
              Title
            </Label>
            <Input
              id="title"
              aria-labelledby="title-label"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full transition-all focus-visible:ring-2 focus-visible:ring-primary/20 text-base sm:text-sm"
              placeholder="Enter course title"
            />
          </div>

          {/* Description Input Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="description"
              id="description-label"
              className="text-sm font-medium"
            >
              Description
            </Label>
            <Textarea
              id="description"
              aria-labelledby="description-label"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="w-full min-h-[120px] transition-all focus-visible:ring-2 focus-visible:ring-primary/20 text-base sm:text-sm resize-y"
              placeholder="Enter course description"
            />
          </div>

          {/* Instructor Name Input Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="instructorName"
              id="instructor-label"
              className="text-sm font-medium"
            >
              Instructor Name
            </Label>
            <Input
              id="instructorName"
              aria-labelledby="instructor-label"
              value={formData.instructorName}
              onChange={(e) =>
                setFormData({ ...formData, instructorName: e.target.value })
              }
              required
              className="w-full transition-all focus-visible:ring-2 focus-visible:ring-primary/20 text-base sm:text-sm"
              placeholder="Enter instructor name"
            />
          </div>

          {/* Duration Input Field */}
          <div className="space-y-2">
            <Label 
              htmlFor="duration"
              id="duration-label"
              className="text-sm font-medium"
            >
              Duration (hours)
            </Label>
            <div className="relative">
              <Input
                id="duration"
                type="number"
                min="1"
                step="1"
                aria-labelledby="duration-label"
                value={formData.duration}
                onChange={(e) =>
                  handleDurationChange(parseInt(e.target.value) || 0)
                }
                required
                className="w-full pr-12 transition-all focus-visible:ring-2 focus-visible:ring-primary/20 text-base sm:text-sm"
                placeholder="Enter course duration in hours"
              />
              <div className="absolute right-0 top-0 h-full flex flex-col border-l border-input">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-1/2 w-12 px-0 hover:bg-accent hover:text-accent-foreground rounded-none rounded-tr-md"
                  onMouseDown={startIncrement}
                  onMouseUp={stopIncrement}
                  onMouseLeave={stopIncrement}
                  onTouchStart={startIncrement}
                  onTouchEnd={stopIncrement}
                  aria-label="Increase duration"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-1/2 w-12 px-0 hover:bg-accent hover:text-accent-foreground rounded-none rounded-br-md border-t"
                  onMouseDown={startDecrement}
                  onMouseUp={stopDecrement}
                  onMouseLeave={stopDecrement}
                  onTouchStart={startDecrement}
                  onTouchEnd={stopDecrement}
                  aria-label="Decrease duration"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className={cn("flex flex-col-reverse sm:flex-row gap-3 pt-6", initialData ? "justify-between" : "justify-end")}>
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                aria-label="Cancel form"
                className="w-full sm:w-auto"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              aria-label={initialData ? "Update course" : "Add course"}
              className="w-full sm:w-auto"
            >
              {initialData ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 