import { getProjectById, getStoriesByProjectId, getTicketsByStoryId } from "@/lib/data";
import type { UserStory, Ticket } from "@/lib/types";
import { Header } from "@/components/header";
import { ProjectDetailsClient } from "@/components/project-details-client";
import { notFound } from "next/navigation";

type StoryWithTickets = UserStory & { tickets: Ticket[] };

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const project = await getProjectById(params.id);

  if (!project) {
    notFound();
  }

  const stories = await getStoriesByProjectId(params.id);
  
  const storiesWithTickets: StoryWithTickets[] = await Promise.all(
    stories.map(async (story) => {
      const tickets = await getTicketsByStoryId(story.id);
      return { ...story, tickets };
    })
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <ProjectDetailsClient project={project} initialStories={storiesWithTickets} />
        </div>
      </main>
    </div>
  );
}
