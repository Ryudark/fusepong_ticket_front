'use client'

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { loginUser } from "@/services/user/auth.service";
import { useRouter } from "next/navigation";
import { getProjects } from "@/services/company/projects.service";
import { any } from "zod";

export default function LoginPage() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
        email,
        password
    };
    const user = await loginUser(formData)
    console.log(user);
    if(user?.isAuthenticated){
      const infoData ={
        CompanyId: user?.userFind?.CompanyId
      }
      console.log(infoData);
      // const projects = await getProjects(infoData)
      const id :any ={CompanyId:user?.userFind?.CompanyId}
      const projects  = await getProjects( user?.userFind?.CompanyId)

      console.log(projects);
      // router.push({pathname: '/projects',query:{arreglo:JSON.stringify(projects)}});
      
    }
    //dejo habilitada la ruta de ingreso al no existir un back montado
    router.push('/projects')
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Bienvenido a Fusepong Ticket</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico para iniciar sesión en tu cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}> 
            <div className="grid gap-4"  >
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline"
                    >
                    ¿Olvidaste tu contraseña?
                  </Link>
                </div>
                <Input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                  <Link href="/login">Iniciar Sesión</Link>
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿No tienes una cuenta?{" "}
            <Link href="/register" className="underline">
              Regístrate
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
