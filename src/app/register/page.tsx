'use client'

import Link from "next/link";
import axios from "axios";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { getCompanies } from "@/services/company/company.service";
import { CompanySchema } from "@/types/Company.type";
import { createUser } from "@/services/user/auth.service";

import { useRouter } from "next/navigation";

export default function RegisterPage() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [CompanyId, setCompanyId] = useState('');
  const [idCompany, setIdCompany] = useState(0)
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const formData = {
          name:name,
          email:email,
          password:password,
          CompanyId:idCompany,
      };
      const user = await createUser(formData)
      router.push('/login');
  };
  const selectCompany = (e:any) =>{
    const selectCompany = company.find(c=>c.name==e)
    const id = selectCompany?.id!
    setIdCompany(id)
  }

  const [company, setCompany] = useState<CompanySchema[]>([])

  const captureCompanies = async() =>{
    const companies = await getCompanies()
    setCompany(companies);
  }

  useEffect(()=>{
    captureCompanies()
  }, [])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-headline">Crear una Cuenta</CardTitle>
          <CardDescription>
            Ingresa tu información para crear una cuenta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nombre</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input 
                  id="password" 
                  type="password" 
                  value={password}
                  placeholder="tener al menos una Mayuscula, simbolo y número"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="preference">Compañia</Label>
                <Select value={CompanyId} onValueChange={selectCompany}>
                  <SelectTrigger id="preference">
                    <SelectValue placeholder="Selecciona tu empresa" />
                  </SelectTrigger>
                  <SelectContent>
                    {company? company.map((c, index)=><SelectItem  key={index} value={c.name}>{c.name}</SelectItem> ):<></>}
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full">
                Crear cuenta
              </Button>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline">
              Iniciar Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
