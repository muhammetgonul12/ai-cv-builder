"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  cvSchema,
  defaultCvValues,
  type CvFormValues,
} from "@/lib/validations/cv-schema";

export function useCvForm() {
  return useForm<CvFormValues>({
    resolver: zodResolver(cvSchema),
    defaultValues: defaultCvValues,
    mode: "onChange",
  });
}
