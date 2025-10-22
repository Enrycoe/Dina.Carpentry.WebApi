import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const formSchema = z.object({
  nome: z.string().min(3, "Nome do projeto deve ter no mínimo 3 caracteres"),
  cliente: z.string().min(3, "Selecione ou informe o cliente"),
  tipo: z.string().min(1, "Selecione o tipo de projeto"),
  descricao: z.string().min(10, "Descrição deve ter no mínimo 10 caracteres"),
  dataInicio: z.string().min(1, "Data de início é obrigatória"),
  prazoEntrega: z.string().min(1, "Prazo de entrega é obrigatório"),
  valorMaoObra: z.string().min(1, "Valor da mão de obra é obrigatório"),
  valorMateriais: z.string().min(1, "Valor estimado de materiais é obrigatório"),
  margemLucro: z.string().min(1, "Margem de lucro é obrigatória"),
  endereco: z.string().optional(),
  observacoes: z.string().optional(),
});

interface ProjetoFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProjetoForm({ open, onOpenChange }: ProjetoFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nome: "",
      cliente: "",
      tipo: "",
      descricao: "",
      dataInicio: "",
      prazoEntrega: "",
      valorMaoObra: "",
      valorMateriais: "",
      margemLucro: "30",
      endereco: "",
      observacoes: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const maoObra = parseFloat(values.valorMaoObra);
    const materiais = parseFloat(values.valorMateriais);
    const custoTotal = maoObra + materiais;
    const margem = parseFloat(values.margemLucro) / 100;
    const valorFinal = custoTotal * (1 + margem);
    
    console.log({
      ...values,
      custoTotal,
      valorFinal,
    });
    
    toast.success(
      `Projeto criado! Valor total: R$ ${valorFinal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      {
        description: `Custo: R$ ${custoTotal.toFixed(2)} + Margem ${values.margemLucro}%`
      }
    );
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Iniciar Novo Projeto</DialogTitle>
          <DialogDescription>
            Cadastre um novo projeto de marcenaria com todos os detalhes
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do Projeto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Cozinha Planejada - Apartamento 101" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="cliente"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cliente</FormLabel>
                    <FormControl>
                      <Input placeholder="Nome do cliente" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tipo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Projeto</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="cozinha">Cozinha Planejada</SelectItem>
                        <SelectItem value="dormitorio">Dormitório</SelectItem>
                        <SelectItem value="escritorio">Escritório</SelectItem>
                        <SelectItem value="banheiro">Banheiro</SelectItem>
                        <SelectItem value="sala">Sala/Living</SelectItem>
                        <SelectItem value="comercial">Comercial</SelectItem>
                        <SelectItem value="moveis">Móveis sob Medida</SelectItem>
                        <SelectItem value="reforma">Reforma</SelectItem>
                        <SelectItem value="outros">Outros</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="descricao"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição do Projeto</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Descreva os detalhes do projeto, medidas, acabamentos, cores, etc."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dataInicio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Data de Início</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="prazoEntrega"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prazo de Entrega</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="border-t pt-4 mt-4">
              <h3 className="text-lg font-semibold mb-4">Valores e Custos</h3>
              
              <div className="grid grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="valorMaoObra"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mão de Obra (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="2500.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="valorMateriais"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Materiais (R$)</FormLabel>
                      <FormControl>
                        <Input type="number" step="0.01" placeholder="5000.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="margemLucro"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Margem de Lucro (%)</FormLabel>
                      <FormControl>
                        <Input type="number" step="1" placeholder="30" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg mt-4">
                <p className="text-sm text-muted-foreground mb-2">Cálculo Automático:</p>
                <div className="space-y-1">
                  <p className="text-sm">
                    Custo Total: R$ {(
                      (parseFloat(form.watch("valorMaoObra") || "0") + 
                       parseFloat(form.watch("valorMateriais") || "0"))
                    ).toFixed(2)}
                  </p>
                  <p className="text-sm font-semibold text-primary">
                    Valor Final: R$ {(
                      (parseFloat(form.watch("valorMaoObra") || "0") + 
                       parseFloat(form.watch("valorMateriais") || "0")) * 
                      (1 + parseFloat(form.watch("margemLucro") || "0") / 100)
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <FormField
              control={form.control}
              name="endereco"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de Instalação (Opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="Rua, número, bairro, cidade" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="observacoes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Observações (Opcional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Informações adicionais, requisitos especiais, etc."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
                Cancelar
              </Button>
              <Button type="submit" className="flex-1">
                Criar Projeto
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
