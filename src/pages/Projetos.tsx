import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreVertical, Calendar } from "lucide-react";
import { ProjetoForm } from "@/components/ProjetoForm";

export default function Projetos() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const projetos = [
    { 
      id: 1, 
      nome: "Cozinha Planejada - Silva", 
      cliente: "Maria Silva", 
      valor: "R$ 18.500",
      inicio: "05/01/2025",
      entrega: "15/01/2025",
      status: "Em Produção",
      progresso: 65
    },
    { 
      id: 2, 
      nome: "Armário Sob Medida - Santos", 
      cliente: "João Santos", 
      valor: "R$ 8.200",
      inicio: "08/01/2025",
      entrega: "20/01/2025",
      status: "Aguardando Material",
      progresso: 30
    },
    { 
      id: 3, 
      nome: "Estante Escritório - Lima", 
      cliente: "Ana Lima", 
      valor: "R$ 5.800",
      inicio: "02/01/2025",
      entrega: "10/01/2025",
      status: "Finalizado",
      progresso: 100
    },
    { 
      id: 4, 
      nome: "Mesa de Jantar - Costa", 
      cliente: "Pedro Costa", 
      valor: "R$ 4.500",
      inicio: "10/01/2025",
      entrega: "25/01/2025",
      status: "Em Produção",
      progresso: 45
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Em Produção": return "bg-info/10 text-info border-info/20";
      case "Aguardando Material": return "bg-warning/10 text-warning border-warning/20";
      case "Finalizado": return "bg-success/10 text-success border-success/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Projetos</h1>
          <p className="text-muted-foreground">Gerencie todos os projetos de marcenaria</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projetos.map((projeto) => (
          <Card key={projeto.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-1">{projeto.nome}</h3>
                <p className="text-sm text-muted-foreground">{projeto.cliente}</p>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center justify-between">
                <Badge className={getStatusColor(projeto.status)} variant="outline">
                  {projeto.status}
                </Badge>
                <span className="text-lg font-bold text-primary">{projeto.valor}</span>
              </div>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{projeto.inicio}</span>
                </div>
                <span>→</span>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{projeto.entrega}</span>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progresso</span>
                  <span className="font-medium text-foreground">{projeto.progresso}%</span>
                </div>
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all"
                    style={{ width: `${projeto.progresso}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" className="flex-1">Ver Detalhes</Button>
              <Button variant="outline" className="flex-1">Editar</Button>
            </div>
          </Card>
        ))}
      </div>

      <ProjetoForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
