import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CyberpunkTemplate } from "@/components/templates/cyberpunk-template";
import { MinimalTemplate } from "@/components/templates/minimal-template";
import { ModernTemplate } from "@/components/templates/modern-template";
import { type CvData, type CvTemplate } from "@/types/cv";

interface Props {
  data: CvData;
  template: CvTemplate;
}

export function CvPreview({ data, template }: Props) {
  const isEmpty = !data.fullName && !data.about;

  return (
    <Card className="h-full border-white/10 bg-white/5 backdrop-blur-xl">
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle className="text-zinc-100">Canlı Önizleme</CardTitle>
      </CardHeader>
      <CardContent>
        {isEmpty ? (
          <div className="rounded-2xl border border-dashed border-white/15 p-12 text-center text-zinc-400">
            Oluşturulan CV burada görünecek.
          </div>
        ) : (
          <div id="cv-preview">
            {template === "minimal" ? <MinimalTemplate data={data} /> : null}
            {template === "modern" ? <ModernTemplate data={data} /> : null}
            {template === "cyberpunk" ? <CyberpunkTemplate data={data} /> : null}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
