export type Business = {
  name: string;
  descriptor: string;
  slogan: string;
  address: { street: string; neighborhood: string; city: string; state: string; postalCode: string };
  whatsapp: { display: string; number: string };
  phones: readonly string[];
  hours: { summary: string; openingTime: string; closingTime: string; openingTimeConfirmed: boolean };
  social: { instagram: string; ifood: string };
  placeholders: readonly string[];
};

export const business: Business = {
  name: "Doceria La Floresta",
  descriptor: "Doces e Sorvetes",
  slogan: "Mais de 20 anos de tradição em bolos, doces e salgados",
  address: {
    street: "Avenida Guapira, 1650",
    neighborhood: "Jaçanã",
    city: "São Paulo",
    state: "SP",
    postalCode: "02265-002",
  },
  whatsapp: { display: "(11) 94809-4770", number: "5511948094770" },
  phones: ["(11) 2249-1380", "(11) 2243-0861"],
  hours: {
    summary: "Aberto todos os dias, até as 02:00",
    openingTime: "[CONFIRMAR horário de abertura]",
    closingTime: "02:00",
    openingTimeConfirmed: false,
  },
  social: {
    instagram: "https://www.instagram.com/doceria.lafloresta",
    ifood: "https://www.ifood.com.br/delivery/sao-paulo-sp/doceria-la-floresta-tucuruvi/b09689a3-352c-43a3-8387-2dd13de01ab5?UTM_Medium=share",
  },
  placeholders: ["[CONFIRMAR horário de abertura]"],
};
