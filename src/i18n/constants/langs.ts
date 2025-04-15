const labels = {
  en: "English",
  fr: "Français",
  es: "Español",
  de: "Deutsch",
  it: "Italiano",
  ko: "한국어",
  pt: "Português",
  ru: "Русский",
  tr: "Türkçe",
  ja: "日本語",
  zh: "中文",
};

export const languages = Object.keys(labels);

export const languages_with_label: {
  id: keyof typeof labels;
  label: string;
}[] = Object.entries(labels).map(([id, label]) => ({
  id: id as keyof typeof labels,
  label,
}));
