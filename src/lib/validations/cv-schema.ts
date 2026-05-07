import { z } from "zod";

export const cvSchema = z.object({
  photo: z.string(),
  fullName: z.string().min(2, "Ad Soyad en az 2 karakter olmalı."),
  title: z.string().min(2, "Ünvan en az 2 karakter olmalı."),
  about: z.string().min(10, "Hakkımda alanı en az 10 karakter olmalı."),
  skills: z.string().min(2, "Yetenekler boş bırakılamaz."),
  certificates: z.string().min(2, "Sertifikalar alanı boş bırakılamaz."),
  languages: z.string().min(2, "Diller alanı boş bırakılamaz."),
  projects: z.string().min(2, "Projeler alanı boş bırakılamaz."),
  experience: z.string().min(2, "Deneyim alanı boş bırakılamaz."),
  education: z.string().min(2, "Eğitim alanı boş bırakılamaz."),
  linkedin: z.string().url("Geçerli bir LinkedIn URL'si giriniz."),
  github: z.string().url("Geçerli bir GitHub URL'si giriniz."),
  email: z.string().email("Geçerli bir e-posta adresi giriniz."),
});

export type CvFormValues = z.infer<typeof cvSchema>;

export const defaultCvValues: CvFormValues = {
  photo: "",
  fullName: "Muhammed Yılmaz",
  title: "Yazılım Mühendisliği Öğrencisi",
  about:
    "Yapay zeka ve backend geliştirme alanlarına odaklanan, modern teknolojilerle ölçeklenebilir ürünler geliştirmeyi hedefleyen bir geliştiriciyim.",
  skills: "Node.js\nTypeScript\nPython\nPostgreSQL\nDocker",
  certificates:
    "Google Data Analytics Certificate\nMeta Front-End Developer Certificate",
  languages: "Türkçe (Ana Dil)\nİngilizce (B2)",
  projects:
    "AI CV Builder - Yapay zeka destekli CV oluşturma platformu\nSmart Parking - Gerçek zamanlı otopark yönetim sistemi",
  experience:
    "Freelance Full Stack Developer (2024 - Günümüz)\nBackend Intern (2023 - 2024)",
  education: "XYZ Üniversitesi - Yazılım Mühendisliği (2022 - 2026)",
  linkedin: "https://linkedin.com/in/ornek-profil",
  github: "https://github.com/ornek",
  email: "ornek@mail.com",
};
