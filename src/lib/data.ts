import type { Project, UserStory, Ticket } from './types';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'CRM QuantumLeap',
    description: 'Una plataforma CRM de nueva generación para revolucionar las interacciones con los clientes.',
    imageUrl: 'https://picsum.photos/seed/1/600/400',
    imageHint: 'office building'
  },
  {
    id: 'proj-2',
    name: 'Pasarela de Pago FusionPay',
    description: 'Una pasarela de pago segura y sin interrupciones para negocios de comercio electrónico.',
    imageUrl: 'https://picsum.photos/seed/2/600/400',
    imageHint: 'modern office'
  },
  {
    id: 'proj-3',
    name: 'Analíticas Nebula',
    description: 'Plataforma de análisis de datos para visualizar métricas de negocio complejas.',
    imageUrl: 'https://picsum.photos/seed/3/600/400',
    imageHint: 'team meeting'
  },
  {
    id: 'proj-4',
    name: 'App Móvil Helios',
    description: 'Una aplicación móvil multiplataforma para redes sociales.',
    imageUrl: 'https://picsum.photos/seed/4/600/400',
    imageHint: 'whiteboard ideas'
  }
];

export const userStories: UserStory[] = [
  // QuantumLeap CRM
  {
    id: 'story-1',
    projectId: 'proj-1',
    title: 'Módulo de Autenticación de Usuario',
    description: 'Como usuario, quiero poder registrarme e iniciar sesión, para poder acceder a mi cuenta de forma segura.'
  },
  {
    id: 'story-2',
    projectId: 'proj-1',
    title: 'Vista de Contactos en el Panel de Control',
    description: 'Como representante de ventas, quiero ver una lista de mis contactos en el panel de control, para poder acceder rápidamente a su información.'
  },
  // FusionPay Gateway
  {
    id: 'story-3',
    projectId: 'proj-2',
    title: 'Pago con Tarjeta de Crédito',
    description: 'Como cliente, quiero poder pagar con mi tarjeta de crédito, para poder completar mi compra.'
  },
  // Nebula Analytics
  {
    id: 'story-4',
    projectId: 'proj-3',
    title: 'Panel de Control de Ventas',
    description: 'Como gerente, quiero ver un panel de control de métricas de ventas, para poder seguir el rendimiento.'
  },
];

export const tickets: Ticket[] = [
  // Story 1
  {
    id: 'ticket-1',
    storyId: 'story-1',
    name: 'Diseñar UI de inicio de sesión',
    description: 'Crear una interfaz de inicio de sesión visualmente atractiva y fácil de usar.',
    status: 'completed'
  },
  {
    id: 'ticket-2',
    storyId: 'story-1',
    name: 'Implementar hash de contraseñas',
    description: 'Asegurar que las contraseñas de los usuarios se almacenen de forma segura con hash.',
    status: 'in-progress'
  },
  {
    id: 'ticket-3',
    storyId: 'story-1',
    name: 'Desarrollar endpoint de registro',
    description: 'Crear el endpoint de la API de backend para el registro de usuarios.',
    status: 'active'
  },
  // Story 2
  {
    id: 'ticket-4',
    storyId: 'story-2',
    name: 'API para lista de contactos',
    description: 'Desarrollar la API para obtener la lista de contactos de un usuario.',
    status: 'completed'
  },
  {
    id: 'ticket-5',
    storyId: 'story-2',
    name: 'Tabla de contactos en frontend',
    description: 'Construir el componente de tabla para mostrar los contactos en el frontend.',
    status: 'completed'
  },
  // Story 3
  {
    id: 'ticket-6',
    storyId: 'story-3',
    name: 'Integrar API de Stripe',
    description: 'Integrar la API de procesamiento de pagos de Stripe.',
    status: 'in-progress'
  },
  // Story 4
  {
    id: 'ticket-7',
    storyId: 'story-4',
    name: 'Componente de gráfico para datos de ventas',
    description: 'Crear un componente de gráfico reutilizable para visualizar datos de ventas.',
    status: 'active'
  },
];

// Functions to simulate data fetching
export const getProjects = async (): Promise<Project[]> => {
  return projects;
}

export const getProjectById = async (id: string): Promise<Project | undefined> => {
  return projects.find(p => p.id === id);
}

export const getStoriesByProjectId = async (projectId: string): Promise<UserStory[]> => {
  return userStories.filter(s => s.projectId === projectId);
}

export const getTicketsByStoryId = async (storyId: string): Promise<Ticket[]> => {
  return tickets.filter(t => t.storyId === storyId);
}
