export interface Link {
  href: string;
  title: string;
}

export interface Section {
  title?: string;
  links: Link[];
}
