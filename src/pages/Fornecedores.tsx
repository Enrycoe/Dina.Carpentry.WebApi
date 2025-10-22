import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, MapPin, Package } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { FornecedorForm } from "@/components/FornecedorForm";

interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;
  cidade: string;
  categoria: string;
  materiaisFornecidos: string[];
  status: "ativo" | "inativo";
  totalCompras: number;
}

const fornecedores: Fornecedor[] = [
  {
    id: 1,
    nome: "Madeiras Premium Ltda",
    cnpj: "12.345.678/0001-90",
    email: "contato@madeiraspremium.com.br",
    telefone: "(11) 3456-7890",
    cidade: "São Paulo",
    categoria: "Madeiras",
    materiaisFornecidos: ["MDF", "MDP", "Compensado", "Madeira Maciça"],
    status: "ativo",
    totalCompras: 45000,
  },
  {
    id: 2,
    nome: "Ferragens e Acessórios Silva",
    cnpj: "98.765.432/0001-10",
    email: "vendas@ferragenssilva.com.br",
    telefone: "(11) 2345-6789",
    cidade: "São Paulo",
    categoria: "Ferragens",
    materiaisFornecidos: ["Dobradiças", "Puxadores", "Corrediças", "Parafusos"],
    status: "ativo",
    totalCompras: 12000,
  },
  {
    id: 3,
    nome: "Tintas e Vernizes Brasil",
    cnpj: "55.444.333/0001-22",
    email: "contato@tintasbrasil.com.br",
    telefone: "(11) 4567-8901",
    cidade: "Guarulhos",
    categoria: "Acabamento",
    materiaisFornecidos: ["Verniz", "Seladora", "Tinta PU", "Stain"],
    status: "ativo",
    totalCompras: 8500,
  },
];

const Fornecedores = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const totalFornecedores = fornecedores.length;
  const fornecedoresAtivos = fornecedores.filter(f => f.status === "ativo").length;
  const totalCompras = fornecedores.reduce((sum, f) => sum + f.totalCompras, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fornecedores</h1>
          <p className="text-muted-foreground">
            Gerencie seus fornecedores e parceiros comerciais
          </p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Novo Fornecedor
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total de Fornecedores"
          value={totalFornecedores.toString()}
          icon={Package}
          trend="+8% este mês"
          trendUp={true}
        />
        <StatCard
          title="Fornecedores Ativos"
          value={fornecedoresAtivos.toString()}
          icon={Package}
        />
        <StatCard
          title="Total em Compras"
          value={`R$ ${totalCompras.toLocaleString('pt-BR')}`}
          icon={Package}
          trend="+12% este mês"
          trendUp={true}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {fornecedores.map((fornecedor) => (
          <Card key={fornecedor.id} className="hover:shadow-elegant transition-all">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{fornecedor.nome}</CardTitle>
                <Badge variant={fornecedor.status === "ativo" ? "default" : "secondary"}>
                  {fornecedor.status}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">{fornecedor.cnpj}</p>
              <Badge variant="outline" className="w-fit mt-2">
                {fornecedor.categoria}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>{fornecedor.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>{fornecedor.telefone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{fornecedor.cidade}</span>
              </div>
              
              <div className="pt-3 border-t">
                <p className="text-sm font-medium mb-2">Materiais Fornecidos:</p>
                <div className="flex flex-wrap gap-1">
                  {fornecedor.materiaisFornecidos.map((material, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      {material}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t">
                <p className="text-sm text-muted-foreground">
                  Total em compras:{" "}
                  <span className="font-semibold text-foreground">
                    R$ {fornecedor.totalCompras.toLocaleString('pt-BR')}
                  </span>
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Ver Histórico
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  Contatar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <FornecedorForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};

export default Fornecedores;
