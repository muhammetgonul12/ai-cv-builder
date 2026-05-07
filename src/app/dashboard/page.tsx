"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AiActions } from "@/components/dashboard/ai-actions";
import { CvForm } from "@/components/dashboard/cv-form";
import { CvPreview } from "@/components/dashboard/cv-preview";
import { ExportPdfButton } from "@/components/dashboard/export-pdf-button";
import { LinkedinSummaryBox } from "@/components/dashboard/linkedin-summary-box";
import { TemplateSwitcher } from "@/components/dashboard/template-switcher";
import { useAiGenerate } from "@/hooks/use-ai-generate";
import { useCvForm } from "@/hooks/use-cv-form";
import { type CvTemplate } from "@/types/cv";
import { useState } from "react";

function parseTemplateFromLocation(): CvTemplate {
  if (typeof window === "undefined") return "modern";
  const queryTemplate = new URLSearchParams(window.location.search).get("template");
  if (
    queryTemplate === "minimal" ||
    queryTemplate === "modern" ||
    queryTemplate === "cyberpunk"
  ) {
    return queryTemplate;
  }
  return "modern";
}

export default function DashboardPage() {
  const form = useCvForm();
  const [template, setTemplate] = useState<CvTemplate>(parseTemplateFromLocation);
  const [linkedinSummary, setLinkedinSummary] = useState("");
  const { generate, loadingType } = useAiGenerate();
  const values = form.watch();

  return (
    <main className="relative min-h-screen bg-[#09090B] px-4 py-10 text-zinc-100 md:px-10">
      <div className="pointer-events-none absolute inset-0 -z-0">
        <div className="absolute left-10 top-10 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
        <div className="absolute bottom-10 right-20 h-72 w-72 rounded-full bg-fuchsia-600/20 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 grid gap-6 lg:grid-cols-2"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="border-white/10 bg-[#111111]/80 backdrop-blur-xl">
          <CardHeader>
            <CardTitle>CV Bilgileri</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <TemplateSwitcher template={template} onChange={setTemplate} />
            <CvForm form={form} />
            <AiActions
              loadingType={loadingType}
              onGenerateBio={async () => {
                const text = await generate("bio", {
                  title: values.title,
                  about: values.about,
                });
                if (text) form.setValue("about", text);
              }}
              onGenerateLinkedin={async () => {
                const text = await generate("linkedin", {
                  fullName: values.fullName,
                  title: values.title,
                  about: values.about,
                  skills: values.skills,
                  experience: values.experience,
                  education: values.education,
                });
                if (text) setLinkedinSummary(text);
              }}
              onEnhanceProject={async () => {
                const text = await generate("project", {
                  projects: values.projects,
                  title: values.title,
                  nonce: `${Date.now()}`,
                });
                if (text) form.setValue("projects", text);
              }}
              onSuggestSkills={async () => {
                const text = await generate("skills", { skills: values.skills });
                if (text) form.setValue("skills", text);
              }}
            />
            <LinkedinSummaryBox summary={linkedinSummary} />
          </CardContent>
        </Card>

        <div className="space-y-4">
          <div className="flex justify-end">
            <ExportPdfButton data={values} />
          </div>
          <CvPreview data={values} template={template} />
        </div>
      </motion.div>
    </main>
  );
}
