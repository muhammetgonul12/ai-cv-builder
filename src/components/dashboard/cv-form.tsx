"use client";

import { ChangeEvent } from "react";
import { type UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type CvFormValues } from "@/lib/validations/cv-schema";

interface Props {
  form: UseFormReturn<CvFormValues>;
}

export function CvForm({ form }: Props) {
  const {
    watch,
    register,
    setValue,
    formState: { errors },
  } = form;
  const photo = watch("photo");

  const handlePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        setValue("photo", result, { shouldDirty: true });
      }
    };
    reader.readAsDataURL(file);
  };

  const fields: Array<keyof CvFormValues> = [
    "fullName",
    "title",
    "linkedin",
    "email",
    "github",
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-white/10 bg-white/5 p-4">
        <label className="text-sm text-zinc-300">Profil Fotoğrafı</label>
        <Input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border-white/10 bg-white/5 text-zinc-100 file:mr-4 file:rounded-md file:border-0 file:bg-violet-600 file:px-3 file:py-1 file:text-white"
        />
        {photo ? (
          <div className="flex justify-center">
            <img
              src={photo}
              alt="Profil fotoğrafı önizleme"
              className="h-36 w-36 rounded-2xl border border-white/20 object-cover"
            />
          </div>
        ) : (
          <div className="flex h-28 items-center justify-center rounded-xl border border-dashed border-white/20 text-xs text-zinc-400">
            Yüklediğiniz fotoğraf burada görünecek
          </div>
        )}
      </div>

      {fields.map((name) => (
        <div key={name} className="space-y-2">
          <label className="text-sm text-zinc-300">{labelMap[name]}</label>
          <Input {...register(name)} className="border-white/10 bg-white/5 text-zinc-100" />
          {errors[name] ? (
            <p className="text-xs text-red-400">{errors[name]?.message}</p>
          ) : null}
        </div>
      ))}

      {textareaFields.map((name) => (
        <div key={name} className="space-y-2">
          <label className="text-sm text-zinc-300">{labelMap[name]}</label>
          <Textarea
            {...register(name)}
            rows={name === "about" ? 4 : 3}
            className="border-white/10 bg-white/5 text-zinc-100"
          />
          {errors[name] ? (
            <p className="text-xs text-red-400">{errors[name]?.message}</p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

const textareaFields: Array<keyof CvFormValues> = [
  "about",
  "education",
  "experience",
  "skills",
  "projects",
  "certificates",
  "languages",
];

const labelMap: Record<keyof CvFormValues, string> = {
  photo: "Profil Fotoğrafı",
  fullName: "Ad Soyad",
  title: "Ünvan",
  about: "Hakkımda",
  skills: "Yetenekler",
  certificates: "Sertifikalar",
  languages: "Diller",
  projects: "Projeler",
  experience: "Deneyim",
  education: "Eğitim",
  linkedin: "LinkedIn",
  github: "GitHub",
  email: "Email",
};
