import Link from 'next/link';
import { getProjects } from '@/lib/data';
// import { getProjects } from '@/services/company/projects.service';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Header } from '@/components/header';

export default async function ProjectsPage() {

  const infoData ={
      CompanyId: 1
  }
  const n= 1

  const projects = await getProjects();
  // const projects = await getProjects(1);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-headline font-bold mb-2">Proyectos</h1>
          <p className="text-muted-foreground mb-8">
            Selecciona un proyecto para ver sus historias de usuario y tickets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Link href={`/project/${project.id}`} key={project.id} passHref>
                <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
                  <CardHeader>
                    <CardTitle className="font-headline">{project.name}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
