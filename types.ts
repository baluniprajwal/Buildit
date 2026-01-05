export interface ServiceItem {
  id: number;
  title: string;
  category: string;
  description: string;
}

export interface WorkItem {
  id: number;
  client: string;
  image: string;
  tags: string[];
}
