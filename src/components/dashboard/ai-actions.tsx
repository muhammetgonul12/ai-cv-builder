"use client";

import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onGenerateBio: () => void;
  onGenerateLinkedin: () => void;
  onEnhanceProject: () => void;
  onSuggestSkills: () => void;
  loadingType: "bio" | "linkedin" | "project" | "skills" | null;
}

const loadingText = "Yapay zeka içerik oluşturuyor...";

export function AiActions({
  onGenerateBio,
  onGenerateLinkedin,
  onEnhanceProject,
  onSuggestSkills,
  loadingType,
}: Props) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-zinc-400">AI Özellikleri</p>
      <div className="grid gap-2 sm:grid-cols-2">
        <Button onClick={onGenerateBio} disabled={!!loadingType} variant="secondary">
          {loadingType === "bio" ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          Profesyonel biyografi oluştur
        </Button>
        <Button onClick={onGenerateLinkedin} disabled={!!loadingType} variant="secondary">
          LinkedIn özeti oluştur
        </Button>
        <Button onClick={onEnhanceProject} disabled={!!loadingType} variant="secondary">
          Proje açıklamasını geliştir
        </Button>
        <Button onClick={onSuggestSkills} disabled={!!loadingType} variant="secondary">
          Yetenek önerisi yap
        </Button>
      </div>
      {loadingType ? (
        <div className="flex items-center gap-2 text-sm text-violet-300">
          <Loader2 className="h-4 w-4 animate-spin" />
          {loadingText}
        </div>
      ) : null}
    </div>
  );
}
