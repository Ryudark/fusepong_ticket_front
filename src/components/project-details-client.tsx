'use client';

import { useState } from 'react';
import type { Project, UserStory, Ticket, TicketStatus } from '@/lib/types';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { TicketDialog } from './ticket-dialog';
import { cn } from '@/lib/utils';

type StoryWithTickets = UserStory & { tickets: Ticket[] };

interface ProjectDetailsClientProps {
  project: Project;
  initialStories: StoryWithTickets[];
}

const statusMap: Record<TicketStatus, { text: string; className: string }> = {
  active: { text: 'Activo', className: 'bg-primary/20 text-primary-foreground border-primary/30 hover:bg-primary/30' },
  'in-progress': { text: 'En Proceso', className: 'bg-yellow-400/20 text-yellow-700 border-yellow-400/30 hover:bg-yellow-400/30' },
  completed: { text: 'Finalizado', className: 'bg-accent/70 text-accent-foreground border-accent/80 hover:bg-accent/80' },
};

export function ProjectDetailsClient({ project, initialStories }: ProjectDetailsClientProps) {
  const [stories, setStories] = useState<StoryWithTickets[]>(initialStories);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [currentStoryId, setCurrentStoryId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [ticketToDelete, setTicketToDelete] = useState<Ticket | null>(null);
  
  const handleAddNewTicket = (storyId: string) => {
    setCurrentStoryId(storyId);
    setEditingTicket(null);
    setIsDialogOpen(true);
  };

  const handleEditTicket = (ticket: Ticket) => {
    setCurrentStoryId(ticket.storyId);
    setEditingTicket(ticket);
    setIsDialogOpen(true);
  };
  
  const handleSaveTicket = (ticket: Ticket) => {
    // This is where you would normally call an API to save the ticket
    // For now, we'll just update the local state to reflect the change
    setStories(prevStories => 
      prevStories.map(story => {
        if (story.id === ticket.storyId) {
          const ticketExists = story.tickets.some(t => t.id === ticket.id);
          if (ticketExists) {
            // Update existing ticket
            return {
              ...story,
              tickets: story.tickets.map(t => t.id === ticket.id ? ticket : t)
            };
          } else {
            // Add new ticket
            return {
              ...story,
              tickets: [...story.tickets, ticket]
            };
          }
        }
        return story;
      })
    );
    setIsDialogOpen(false);
  };

  const openDeleteDialog = (ticket: Ticket) => {
    setTicketToDelete(ticket);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteTicket = () => {
    if (!ticketToDelete) return;

    setStories(prevStories =>
      prevStories.map(story => {
        if (story.id === ticketToDelete.storyId) {
          return {
            ...story,
            tickets: story.tickets.filter(t => t.id !== ticketToDelete.id),
          };
        }
        return story;
      })
    );
    setIsDeleteDialogOpen(false);
    setTicketToDelete(null);
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-headline font-bold mb-2">{project.name}</h1>
        <p className="text-muted-foreground max-w-2xl">{project.description}</p>
      </div>

      <Accordion type="multiple" className="w-full space-y-4">
        {stories.map((story) => (
          <AccordionItem value={story.id} key={story.id} className="border-none">
            <Card>
              <AccordionTrigger className="p-6 text-lg font-semibold hover:no-underline">
                {story.title}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <p className="text-muted-foreground mb-6">{story.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-md font-semibold">Tickets</h3>
                  <Button size="sm" onClick={() => handleAddNewTicket(story.id)}>
                    <Plus className="mr-2 h-4 w-4" /> Añadir Ticket
                  </Button>
                </div>
                <div className="space-y-3">
                  {story.tickets.length > 0 ? (
                    story.tickets.map((ticket) => (
                      <Card key={ticket.id} className="p-4 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{ticket.name}</p>
                          <p className="text-sm text-muted-foreground">{ticket.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={cn('font-semibold', statusMap[ticket.status].className)}>
                            {statusMap[ticket.status].text}
                          </Badge>
                          <Button variant="ghost" size="icon" onClick={() => handleEditTicket(ticket)}>
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Editar Ticket</span>
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => openDeleteDialog(ticket)}>
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Eliminar Ticket</span>
                          </Button>
                        </div>
                      </Card>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">Aún no hay tickets para esta historia de usuario.</p>
                  )}
                </div>
              </AccordionContent>
            </Card>
          </AccordionItem>
        ))}
      </Accordion>
      
      {isDialogOpen && (
        <TicketDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSaveTicket}
          ticket={editingTicket}
          storyId={currentStoryId!}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Esto eliminará permanentemente el ticket.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteTicket}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
