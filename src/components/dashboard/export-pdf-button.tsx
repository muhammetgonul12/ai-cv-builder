"use client";

import { Download } from "lucide-react";
import { jsPDF } from "jspdf";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { type CvData } from "@/types/cv";

interface Props {
  data: CvData;
}

export function ExportPdfButton({ data }: Props) {
  const handleExport = async () => {
    if (!data.fullName && !data.about) {
      toast.error("Bir hata oluştu");
      return;
    }

    try {
      const preview = document.getElementById("cv-preview");
      if (!preview) {
        toast.error("Bir hata oluştu");
        return;
      }

      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(preview, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: "transparent",
      });

      const img = new Image();
      img.src = dataUrl;
      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error("Görsel oluşturulamadı"));
      });

      const sourceCanvas = document.createElement("canvas");
      sourceCanvas.width = img.width;
      sourceCanvas.height = img.height;
      const sourceCtx = sourceCanvas.getContext("2d");
      if (!sourceCtx) throw new Error("Canvas başlatılamadı");
      sourceCtx.drawImage(img, 0, 0);

      const imageData = sourceCtx.getImageData(0, 0, img.width, img.height);
      const { data: pixels } = imageData;

      let minX = img.width;
      let minY = img.height;
      let maxX = -1;
      let maxY = -1;

      for (let y = 0; y < img.height; y += 1) {
        for (let x = 0; x < img.width; x += 1) {
          const idx = (y * img.width + x) * 4;
          const alpha = pixels[idx + 3];
          if (alpha > 5) {
            if (x < minX) minX = x;
            if (y < minY) minY = y;
            if (x > maxX) maxX = x;
            if (y > maxY) maxY = y;
          }
        }
      }

      if (maxX < minX || maxY < minY) {
        throw new Error("Boş görsel");
      }

      const cropWidth = maxX - minX + 1;
      const cropHeight = maxY - minY + 1;
      const croppedCanvas = document.createElement("canvas");
      croppedCanvas.width = cropWidth;
      croppedCanvas.height = cropHeight;
      const croppedCtx = croppedCanvas.getContext("2d");
      if (!croppedCtx) throw new Error("Canvas başlatılamadı");

      croppedCtx.drawImage(
        sourceCanvas,
        minX,
        minY,
        cropWidth,
        cropHeight,
        0,
        0,
        cropWidth,
        cropHeight
      );

      const croppedDataUrl = croppedCanvas.toDataURL("image/png");
      const orientation = cropWidth >= cropHeight ? "landscape" : "portrait";
      const pdf = new jsPDF({
        orientation,
        unit: "px",
        format: [cropWidth, cropHeight],
      });

      pdf.addImage(croppedDataUrl, "PNG", 0, 0, cropWidth, cropHeight);

      pdf.save("cv.pdf");
      toast.success("İçerik başarıyla oluşturuldu");
    } catch {
      toast.error("Bir hata oluştu");
    }
  };

  return (
    <Button onClick={handleExport} className="bg-violet-600 hover:bg-violet-500">
      <Download className="mr-2 h-4 w-4" />
      PDF Olarak İndir
    </Button>
  );
}
