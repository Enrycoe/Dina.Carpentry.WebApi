import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, AlertTriangle, Package } from "lucide-react";
import { ItemEstoqueForm } from "@/components/ItemEstoqueForm";

export default function Estoque() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const materiais = [
    { id: 1, nome: "MDF 15mm Branco", categoria: "Chapas", quantidade: 8, unidade: "unidades", minimo: 10, status: "baixo" },
    { id: 2, nome: "Compensado 18mm", categoria: "Chapas", quantidade: 25, unidade: "unidades", minimo: 15, status: "ok" },
    { id: 3, nome: "Dobradiça 35mm", categoria: "Ferragens", quantidade: 120, unidade: "peças", minimo: 50, status: "ok" },
    { id: 4, nome: "Corrediça Telescópica", categoria: "Ferragens", quantidade: 35, unidade: "pares", minimo: 30, status: "ok" },
    { id: 5, nome: "Verniz Marítimo", categoria: "Acabamentos", quantidade: 3, unidade: "litros", minimo: 5, status: "baixo" },
    { id: 6, nome: "Cola Branca", categoria: "Consumíveis", quantidade: 15, unidade: "litros", minimo: 10, status: "ok" },
    { id: 7, nome: "Lixa 120", categoria: "Consumíveis", quantidade: 45, unidade: "folhas", minimo: 50, status: "baixo" },
    { id: 8, nome: "Puxador Alumínio", categoria: "Ferragens", quantidade: 78, unidade: "peças", minimo: 40, status: "ok" },
  ];

  const categorias = ["Todos", "Chapas", "Ferragens", "Acabamentos", "Consumíveis"];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Estoque</h1>
          <p className="text-muted-foreground">Controle de materiais e suprimentos</p>
        </div>
        <Button onClick={() => setIsFormOpen(true)} className="bg-gradient-primary hover:opacity-90">
          <Plus className="w-4 h-4 mr-2" />
          Adicionar Material
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">234</p>
              <p className="text-sm text-muted-foreground">Total de Itens</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">8</p>
              <p className="text-sm text-muted-foreground">Estoque Baixo</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">4</p>
              <p className="text-sm text-muted-foreground">Categorias</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 shadow-card">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-info/10 flex items-center justify-center">
              <Package className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">15</p>
              <p className="text-sm text-muted-foreground">Pedidos Pendentes</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6 shadow-card">
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          {categorias.map((cat) => (
            <Button 
              key={cat} 
              variant={cat === "Todos" ? "default" : "outline"}
              size="sm"
            >
              {cat}
            </Button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Material</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-foreground">Categoria</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Quantidade</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Mínimo</th>
                <th className="text-center py-3 px-4 text-sm font-semibold text-foreground">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-foreground">Ações</th>
              </tr>
            </thead>
            <tbody>
              {materiais.map((material) => (
                <tr key={material.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                  <td className="py-4 px-4">
                    <p className="font-medium text-foreground">{material.nome}</p>
                  </td>
                  <td className="py-4 px-4">
                    <Badge variant="secondary">{material.categoria}</Badge>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <span className="font-medium text-foreground">
                      {material.quantidade} {material.unidade}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center text-muted-foreground">
                    {material.minimo}
                  </td>
                  <td className="py-4 px-4 text-center">
                    {material.status === "baixo" ? (
                      <Badge className="bg-warning/10 text-warning border-warning/20" variant="outline">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Baixo
                      </Badge>
                    ) : (
                      <Badge className="bg-success/10 text-success border-success/20" variant="outline">
                        Normal
                      </Badge>
                    )}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <Button variant="ghost" size="sm">Editar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <ItemEstoqueForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
}
