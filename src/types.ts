export type Navigation = {
  title: string;
  active?: boolean;
  icon: React.ElementType;
  items: NavigationItem[];
};

export type NavigationItem = {
  title: string;
  url: string;
};
