export const prompts = {
  bio: (title: string) =>
    `Yapay zeka, backend geliştirme ve modern yazılım teknolojileriyle ilgilenen ${title} için profesyonel ve etkileyici kısa bir biyografi oluştur. Sadece metin döndür.`,
  linkedin: (title: string) =>
    `Yapay zeka ve backend geliştirme alanlarına ilgi duyan ${title} için profesyonel bir LinkedIn özeti oluştur. Sadece metin döndür.`,
  project: (projectText: string) =>
    `Aşağıdaki proje açıklamasını daha profesyonel ve etkileyici hale getir. Sadece metin döndür:\n${projectText}`,
  skills: (skillsText: string) =>
    `Aşağıdaki yeteneklere uygun 6 ek teknik yetenek öner. Virgülle ayırarak sadece düz metin döndür:\n${skillsText}`,
};

export type PromptType = keyof typeof prompts;
