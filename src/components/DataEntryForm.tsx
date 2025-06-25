"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Define the validation schema using Zod
const formSchema = z.object({
  value: z.coerce
    .number({
      required_error: "A numerical value is required.",
      invalid_type_error: "Value must be a number.",
    })
    .positive("Value must be a positive number."),
  category: z.string().min(1, "Please select a category."),
  date: z.date({
    required_error: "A date is required.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

interface DataEntryFormProps {
  // Optional callback to run on successful form submission
  onSuccess?: (data: FormValues) => void;
  // Optional default values for editing a record
  defaultValues?: Partial<FormValues>;
}

const DataEntryForm: React.FC<DataEntryFormProps> = ({ onSuccess, defaultValues }) => {
  console.log('DataEntryForm loaded');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      value: defaultValues?.value || undefined,
      category: defaultValues?.category || "",
      date: defaultValues?.date || new Date(),
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted with data:", data);
    toast.success("Data entry saved!", {
      description: `Value: ${data.value}, Category: ${data.category}`,
    });
    if (onSuccess) {
      onSuccess(data);
    }
    form.reset(); // Reset form after successful submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Numerical Value Field */}
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numerical Value</FormLabel>
              <FormControl>
                <Input type="number" placeholder="e.g., 125.50" {...field} />
              </FormControl>
              <FormDescription>
                Enter the quantitative data you want to track.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category Selector Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Sales">Sales</SelectItem>
                  <SelectItem value="Expenses">Expenses</SelectItem>
                  <SelectItem value="Users">Users</SelectItem>
                  <SelectItem value="Clicks">Clicks</SelectItem>
                  <SelectItem value="Impressions">Impressions</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Assign a category to this data point.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date Picker Field */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                The date this data point was recorded.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? "Saving..." : "Save Entry"}
        </Button>
      </form>
    </Form>
  );
};

export default DataEntryForm;