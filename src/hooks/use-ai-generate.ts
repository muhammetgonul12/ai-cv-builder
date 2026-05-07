"use client";

import { useState } from "react";
import { toast } from "sonner";

type AiType = "bio" | "linkedin" | "project" | "skills";

export function useAiGenerate() {
  const [loadingType, setLoadingType] = useState<AiType | null>(null);

  const generate = async (type: AiType, payload: Record<string, string>) => {
    try {
      setLoadingType(type);
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, payload }),
      });

      if (!response.ok) {
        const err = (await response.json()) as {
          error?: string;
          fallbackText?: string;
        };
        if (err.fallbackText) {
          toast.success("Demo AI içeriği oluşturuldu");
          return err.fallbackText;
        }
        throw new Error(err.error || "AI isteği başarısız.");
      }

      const data = (await response.json()) as { text: string };
      toast.success("İçerik başarıyla oluşturuldu");
      return data.text;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Bir hata oluştu";
      toast.error(message);
      return null;
    } finally {
      setLoadingType(null);
    }
  };

  return { generate, loadingType };
}
