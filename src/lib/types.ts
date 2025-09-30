export type TicketStatus = 'active' | 'in-progress' | 'completed';

export type Ticket = {
  id: string;
  name: string;
  description: string;
  status: TicketStatus;
  storyId: string;
};

export type UserStory = {
  id: string;
  title: string;
  description: string;
  projectId: string;
};

export type Project = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};
