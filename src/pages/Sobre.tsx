
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BaseCard } from "@/components/ui/BaseCard";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-light to-white">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-fade-in">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nossa História
          </h1>
          <p className="text-xl text-gray-600">
            Conheça a trajetória da HairLux no mundo da beleza capilar
          </p>
        </div>

        <div className="space-y-8">
          <BaseCard variant="content" size="lg" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              O Início de Tudo
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              A HairLux nasceu em 2015 da paixão de Maria Silva pela beleza capilar. 
              Após anos trabalhando como cabeleireira, Maria percebeu a dificuldade que 
              muitas mulheres enfrentavam para encontrar cabelos de qualidade a preços justos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Com apenas R$ 5.000 de investimento inicial, ela começou importando cabelos 
              naturais diretamente da Índia e do Peru, garantindo qualidade superior e 
              preços acessíveis para suas clientes.
            </p>
          </BaseCard>

          <BaseCard variant="content" size="lg" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Crescimento e Expansão
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Em 2018, a empresa expandiu para o mundo digital, criando sua primeira 
              loja online. O que começou como um pequeno negócio local se transformou 
              em uma das principais referências em cabelos no Brasil.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Hoje atendemos mais de 10.000 clientes em todo o país, oferecendo desde 
              cabelos naturais premium até opções sintéticas de alta qualidade, sempre 
              com o compromisso de realçar a beleza natural de cada mulher.
            </p>
          </BaseCard>

          <BaseCard variant="content" size="lg" className="animate-fade-in">
            <h2 className="text-2xl font-bold text-brand-dark mb-4">
              Nosso Compromisso
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Na HairLux, acreditamos que toda mulher merece se sentir linda e confiante. 
              Por isso, trabalhamos apenas com fornecedores éticos e sustentáveis, 
              garantindo que nossos produtos não apenas embelezem, mas também respeitem 
              o meio ambiente e as comunidades produtoras.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Nosso objetivo é continuar sendo a escolha número um de quem busca qualidade, 
              variedade e atendimento personalizado no universo da beleza capilar.
            </p>
          </BaseCard>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-brand-primary mb-2">9+</div>
              <div className="text-gray-600">Anos de Experiência</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-brand-primary mb-2">10k+</div>
              <div className="text-gray-600">Clientes Satisfeitas</div>
            </div>
            <div className="text-center animate-fade-in">
              <div className="text-4xl font-bold text-brand-primary mb-2">500+</div>
              <div className="text-gray-600">Produtos Disponíveis</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;
