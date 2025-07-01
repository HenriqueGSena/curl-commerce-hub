
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      // Header
      header: {
        home: 'Início',
        products: 'Produtos',
        about: 'Sobre',
        cart: 'Carrinho'
      },
      // Home Page
      home: {
        title: 'Transforme seu Visual com Nossos Cabelos Premium',
        subtitle: 'Descubra a coleção mais completa de cabelos naturais, sintéticos e acessórios para expressar sua personalidade única.',
        cta: 'Explorar Produtos',
        categoriesTitle: 'Explore Nossas Categorias',
        categoriesSubtitle: 'Encontre exatamente o que você procura em nossa ampla seleção de produtos',
        featuredTitle: 'Produtos em Destaque',
        featuredSubtitle: 'Selecionamos os melhores produtos para você'
      },
      // Categories
      categories: {
        natural: 'Cabelos Naturais',
        naturalDesc: '100% naturais e de alta qualidade',
        synthetic: 'Cabelos Sintéticos',
        syntheticDesc: 'Resistentes e com ótimo custo-benefício',
        megaHair: 'Mega Hair',
        megaHairDesc: 'Para alongamentos e volumes incríveis',
        wigs: 'Perucas',
        wigsDesc: 'Perucas modernas e estilosas',
        seeProducts: 'Ver Produtos'
      },
      // Products Page
      products: {
        title: 'Nossos Produtos',
        subtitle: 'Encontre o cabelo perfeito para você',
        filters: 'Filtros',
        clear: 'Limpar',
        sortBy: 'Ordenar por',
        newest: 'Mais Recentes',
        oldest: 'Mais Antigos',
        length: 'Comprimento',
        long: 'Longos (40cm+)',
        short: 'Curtos (até 40cm)',
        color: 'Cor',
        blonde: 'Loiros',
        brown: 'Castanhos',
        black: 'Pretos',
        red: 'Ruivos',
        texture: 'Textura',
        straight: 'Lisos',
        wavy: 'Ondulados',
        curly: 'Cacheados',
        kinky: 'Crespos',
        activeFilters: 'Filtros Ativos:',
        productsFound: 'produto encontrado',
        productsFoundPlural: 'produtos encontrados',
        page: 'Página',
        of: 'de',
        noProducts: 'Nenhum produto encontrado com os filtros selecionados.'
      },
      // Footer
      footer: {
        description: 'Transformando vidas através da beleza. Oferecemos os melhores cabelos e acessórios para você expressar sua personalidade.',
        quickLinks: 'Links Rápidos',
        aboutUs: 'Sobre Nós',
        contact: 'Contato',
        blog: 'Blog',
        customerService: 'Atendimento',
        helpCenter: 'Central de Ajuda',
        returnPolicy: 'Política de Troca',
        shipping: 'Frete e Entrega',
        terms: 'Termos de Uso',
        privacy: 'Privacidade',
        allRights: 'Todos os direitos reservados.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pt',
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
