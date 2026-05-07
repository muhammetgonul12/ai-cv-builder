"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface Props {
  summary: string;
}

export function LinkedinSummaryBox({ summary }: Props) {
  if (!summary.trim()) {
    return null;
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(summary);
    toast.success("LinkedIn özeti kopyalandı");
  };

  return (
    <Card className="border-violet-500/30 bg-violet-500/10">
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm text-violet-100">LinkedIn Özeti</CardTitle>
        <Button size="sm" variant="secondary" onClick={handleCopy}>
          <Copy className="mr-2 h-4 w-4" />
          Kopyala
        </Button>
      </CardHeader>
      <CardContent>
        <Textarea
          readOnly
          value={summary}
          rows={6}
          className="border-violet-300/30 bg-black/20 text-zinc-100"
        />
      </CardContent>
    </Card>
  );
}
