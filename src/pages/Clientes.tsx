import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, MapPin } from "lucide-react";
import { ClienteForm } from "@/components/ClienteForm";

export default function Clientes() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const clientes = [
    { 
      id: 1, 
      nome: "Maria Silva", 
      email: "maria.silva@email.com", 
      telefone: "(11) 98765-4321",
      cidade: "São Paulo - SP",
      projetos: 3,
      valorTotal: "R$ 32.500",
      status: "ativo"
    },
    { 
      id: 2, 
      nome: "João Santos", 
      email: "joao.santos@email.com", 
      telefone: "(11) 99876-5432",
      cidade: "São Paulo - SP",
      projetos: 1,
      valorTotal: "R$ 8.200",
      status: "ativo"
    },
    { 
      id: 3, 
      nome: "Ana Lima", 
      email: "ana.lima@email.com", 
      telefone: "(11) 97654-3210",
      cidade: "Guarulhos - SP",
      projetos: 2,
      valorTotal: "R$ 14.300",
      status: "inativo"
    },
    { 
      id: 4, 
      nome: "Pedro Costa", 
      email: "pedro.costa@email.com", 
      telefone: "(11) 98765-1234",
      cidade: "São Bernardo - SP",
      projetos: 1,
      valorTotal: "R$ 4.500",
      status: "ativo"
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Clientes</h1>
          <p className="text-muted-foreground">Gerencie sua carteira de clientes</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 shadow-card">
          <h3 className="text-3xl font-bold text-foreground mb-1">48</h3>
          <p className="text-sm text-muted-foreground">Total de Clientes</p>
        </Card>
        <Card className="p-6 shadow-card">
          <h3 className="text-3xl font-bold text-success mb-1">35</h3>
          <p className="text-sm text-muted-foreground">Clientes Ativos</p>
        </Card>
        <Card className="p-6 shadow-card">
          <h3 className="text-3xl font-bold text-primary mb-1">R$ 189.400</h3>
          <p className="text-sm text-muted-foreground">Valor Total de Projetos</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {clientes.map((cliente) => (
          <Card key={cliente.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-semibold text-lg">
                  {cliente.nome.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{cliente.nome}</h3>
                  <Badge 
                    className={cliente.status === "ativo" 
                      ? "bg-success/10 text-success border-success/20" 
                      : "bg-muted text-muted-foreground"
                    } 
                    variant="outline"
                  >
                    {cliente.status === "ativo" ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{cliente.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{cliente.telefone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{cliente.cidade}</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-t border-border">
              <div>
                <p className="text-sm text-muted-foreground">Projetos</p>
                <p className="font-semibold text-foreground">{cliente.projetos}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Valor Total</p>
                <p className="font-semibold text-primary">{cliente.valorTotal}</p>
              </div>
            </div>

            <div className="flex gap-2 mt-4">
              <Button variant="outline" className="flex-1">Ver Projetos</Button>
              <Button variant="outline" className="flex-1">Contatar</Button>
            </div>
          </Card>
        ))}
      </div>

      <ClienteForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
