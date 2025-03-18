"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CourseFormData } from "@/lib/types";

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => void;
  initialData?: CourseFormData;
  onCancel?: () => void;
}

export function CourseForm({ onSubmit, initialData, onCancel }: CourseFormProps) {
  const [formData, setFormData] = useState<CourseFormData>(
    initialData || {
      title: "",
      description: "",
      instructorName: "",
      duration: "",
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <form 
          onSubmit={handleSubmit} 
          className="space-y-6"
          aria-label={initialData ? "Edit course form" : "Add new course form"}
        >
          <div className="space-y-2">
            <Label 
              htmlFor="title"
              id="title-label"
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
              className="transition-all focus:ring-2 focus:ring-primary/20"
              placeholder="Enter course title"
            />
          </div>
          <div className="space-y-2">
            <Label 
              htmlFor="description"
              id="description-label"
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
              className="transition-all focus:ring-2 focus:ring-primary/20 min-h-[100px]"
              placeholder="Enter course description"
            />
          </div>
          <div className="space-y-2">
            <Label 
              htmlFor="instructorName"
              id="instructor-label"
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
              className="transition-all focus:ring-2 focus:ring-primary/20"
              placeholder="Enter instructor name"
            />
          </div>
          <div className="space-y-2">
            <Label 
              htmlFor="duration"
              id="duration-label"
            >
              Duration
            </Label>
            <Input
              id="duration"
              aria-labelledby="duration-label"
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              required
              className="transition-all focus:ring-2 focus:ring-primary/20"
              placeholder="Enter course duration (e.g., 8 weeks)"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            {onCancel && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={onCancel}
                aria-label="Cancel form"
              >
                Cancel
              </Button>
            )}
            <Button 
              type="submit"
              aria-label={initialData ? "Update course" : "Add course"}
            >
              {initialData ? "Update Course" : "Add Course"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 