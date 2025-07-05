
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData);
    
    toast({
      title: "Mensagem enviada!",
      description: "Obrigado pelo seu contato. Responderemos em breve.",
    });

    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-gradient-to-b from-gray-50 to-white rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Entrar em contato
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="sr-only">Nome</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Nome"
              value={formData.name}
              onChange={handleInputChange}
              className="h-12 bg-white border-gray-300 rounded-lg px-4 placeholder:text-gray-500"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="sr-only">E-mail</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail *"
              value={formData.email}
              onChange={handleInputChange}
              className="h-12 bg-white border-gray-300 rounded-lg px-4 placeholder:text-gray-500"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="sr-only">Telefone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleInputChange}
            className="h-12 bg-white border-gray-300 rounded-lg px-4 placeholder:text-gray-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="message" className="sr-only">Comentário</Label>
          <Textarea
            id="message"
            name="message"
            placeholder="Comentário"
            value={formData.message}
            onChange={handleInputChange}
            className="min-h-[120px] bg-white border-gray-300 rounded-lg px-4 py-3 placeholder:text-gray-500 resize-none"
            required
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white font-medium py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};
