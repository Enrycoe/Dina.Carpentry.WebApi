import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Calendar as CalendarIcon, Clock } from "lucide-react";

export default function Agenda() {
  const eventos = [
    { 
      id: 1, 
      titulo: "Entrega: Cozinha Silva", 
      cliente: "Maria Silva",
      data: "15/01/2025", 
      hora: "14:00",
      tipo: "entrega",
      local: "Rua das Flores, 123 - São Paulo"
    },
    { 
      id: 2, 
      titulo: "Medição: Armário Santos", 
      cliente: "João Santos",
      data: "16/01/2025", 
      hora: "10:00",
      tipo: "medicao",
      local: "Av. Paulista, 456 - São Paulo"
    },
    { 
      id: 3, 
      titulo: "Reunião: Novo Projeto Lima", 
      cliente: "Ana Lima",
      data: "17/01/2025", 
      hora: "15:30",
      tipo: "reuniao",
      local: "Showroom - Loja"
    },
    { 
      id: 4, 
      titulo: "Instalação: Mesa Costa", 
      cliente: "Pedro Costa",
      data: "18/01/2025", 
      hora: "09:00",
      tipo: "instalacao",
      local: "Rua dos Pinheiros, 789 - São Paulo"
    },
    { 
      id: 5, 
      titulo: "Entrega: Estante Lima", 
      cliente: "Ana Lima",
      data: "10/01/2025", 
      hora: "16:00",
      tipo: "entrega",
      local: "Rua Central, 321 - Guarulhos"
    },
  ];

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "entrega": return "bg-success/10 text-success border-success/20";
      case "medicao": return "bg-info/10 text-info border-info/20";
      case "reuniao": return "bg-warning/10 text-warning border-warning/20";
      case "instalacao": return "bg-primary/10 text-primary border-primary/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getTipoLabel = (tipo: string) => {
    switch (tipo) {
      case "entrega": return "Entrega";
      case "medicao": return "Medição";
      case "reuniao": return "Reunião";
      case "instalacao": return "Instalação";
      default: return tipo;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agenda</h1>
          <p className="text-muted-foreground">Compromissos e entregas agendadas</p>
        </div>
        <Button className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Novo Compromisso
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {eventos.map((evento) => (
            <Card key={evento.id} className="p-6 shadow-card hover:shadow-elevated transition-all">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Badge className={getTipoColor(evento.tipo)} variant="outline">
                      {getTipoLabel(evento.tipo)}
                    </Badge>
                    <h3 className="text-lg font-semibold text-foreground">{evento.titulo}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">{evento.cliente}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CalendarIcon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Data</p>
                    <p className="font-medium text-foreground">{evento.data}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Horário</p>
                    <p className="font-medium text-foreground">{evento.hora}</p>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-muted/50 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground mb-1">Local</p>
                <p className="text-sm font-medium text-foreground">{evento.local}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">Editar</Button>
                <Button variant="outline" className="flex-1">Concluir</Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Resumo Semanal</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-success/10 rounded-lg">
                <span className="text-sm font-medium text-success">Entregas</span>
                <span className="text-2xl font-bold text-success">3</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-info/10 rounded-lg">
                <span className="text-sm font-medium text-info">Medições</span>
                <span className="text-2xl font-bold text-info">2</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-warning/10 rounded-lg">
                <span className="text-sm font-medium text-warning">Reuniões</span>
                <span className="text-2xl font-bold text-warning">4</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <span className="text-sm font-medium text-primary">Instalações</span>
                <span className="text-2xl font-bold text-primary">1</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-primary text-primary-foreground">
            <h3 className="font-semibold mb-2">Próximo Compromisso</h3>
            <p className="text-sm mb-4">Entrega: Cozinha Silva</p>
            <div className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4" />
              <span className="text-sm">15/01/2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span className="text-sm">14:00</span>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
