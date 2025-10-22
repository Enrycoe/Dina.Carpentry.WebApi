import { StatCard } from "@/components/StatCard";
import { Card } from "@/components/ui/card";
import { Hammer, DollarSign, Package, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const recentProjects = [
    { id: 1, name: "Cozinha Planejada - Silva", status: "Em Produção", progress: 65, deadline: "15/01/2025" },
    { id: 2, name: "Armário Sob Medida - Santos", status: "Aguardando Material", progress: 30, deadline: "20/01/2025" },
    { id: 3, name: "Estante Escritório - Lima", status: "Finalizado", progress: 100, deadline: "10/01/2025" },
    { id: 4, name: "Mesa de Jantar - Costa", status: "Em Produção", progress: 45, deadline: "25/01/2025" },
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
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio de marcenaria</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Projetos Ativos"
          value={12}
          icon={Hammer}
          trend="+3 este mês"
          trendUp={true}
        />
        <StatCard
          title="Receita Mensal"
          value="R$ 45.280"
          icon={DollarSign}
          trend="+12% vs mês anterior"
          trendUp={true}
        />
        <StatCard
          title="Itens em Estoque"
          value={234}
          icon={Package}
          trend="8 itens baixos"
          trendUp={false}
        />
        <StatCard
          title="Projetos Concluídos"
          value={8}
          icon={CheckCircle}
          trend="Este mês"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6 shadow-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-foreground">Projetos Recentes</h2>
            <Badge variant="secondary">4 ativos</Badge>
          </div>
          
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div key={project.id} className="border border-border rounded-lg p-4 hover:shadow-card transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground">{project.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={getStatusColor(project.status)} variant="outline">
                        {project.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {project.deadline}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-primary">{project.progress}%</span>
                </div>
                
                <div className="w-full bg-secondary rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6 shadow-card">
            <h2 className="text-xl font-semibold text-foreground mb-4">Alertas</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-warning/10 border border-warning/20 rounded-lg">
                <AlertCircle className="w-5 h-5 text-warning mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-warning">Material Baixo</p>
                  <p className="text-xs text-muted-foreground mt-1">MDF 15mm - 8 chapas restantes</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-3 bg-info/10 border border-info/20 rounded-lg">
                <Clock className="w-5 h-5 text-info mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-info">Prazo Próximo</p>
                  <p className="text-xs text-muted-foreground mt-1">Cozinha Silva - entrega em 5 dias</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-success/10 border border-success/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">Pagamento Recebido</p>
                  <p className="text-xs text-muted-foreground mt-1">Cliente Costa - R$ 3.200</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 shadow-card bg-gradient-primary text-primary-foreground">
            <h3 className="font-semibold mb-2">Meta Mensal</h3>
            <p className="text-3xl font-bold mb-4">R$ 50.000</p>
            <div className="w-full bg-primary-foreground/20 rounded-full h-2 mb-2">
              <div className="bg-primary-foreground h-2 rounded-full" style={{ width: '90%' }} />
            </div>
            <p className="text-sm text-primary-foreground/80">90% alcançado - faltam R$ 4.720</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
