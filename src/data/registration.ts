export type RegistrationOption = {
  id: "individual" | "group" | "seeded";
  title: string;
  shortTitle: string;
  description: string;
  status: "closed" | "open" | "coming";
  price: string | null;
  ageLimit: string | null;
};

export const registration = {
  currentYear: 2026,
  nextYear: 2027,
  nextRegistrationOpen: null as string | null,

  status: {
    label: "2026 er fulltegnet",
    description:
      "Påmelding for neste arrangement publiseres her så snart dato og klokkeslett er bekreftet.",
  },

  options: [
    {
      id: "individual",
      title: "Individuell påmelding",
      shortTitle: "Individuell",
      description:
        "For deg som melder deg på selv. Pris, klasser og åpningstidspunkt oppdateres når neste påmelding er klar.",
      status: "coming",
      price: null,
      ageLimit: null,
    },
    {
      id: "group",
      title: "Gruppepåmelding",
      shortTitle: "Gruppe",
      description:
        "For lag, bedrifter og andre grupper. Kapasitet, frister og regler legges inn som strukturert informasjon.",
      status: "coming",
      price: null,
      ageLimit: null,
    },
    {
      id: "seeded",
      title: "Seedet gruppe",
      shortTitle: "Seedet",
      description:
        "Informasjon om kriterier, dokumentasjon og plassering i seedet gruppe publiseres samlet her.",
      status: "coming",
      price: null,
      ageLimit: null,
    },
  ] satisfies RegistrationOption[],

  importantDates: [
    {
      label: "Påmeldingen åpner",
      value: "Dato kommer",
      note: "Tidspunkt for 2027 publiseres når det er bekreftet.",
    },
    {
      label: "Frist for endringer",
      value: "Dato kommer",
      note: "Navnebytte og andre endringer får egen frist.",
    },
    {
      label: "Løpshelg",
      value: "Dato kommer",
      note: "2027-datoene legges inn når arrangøren har bekreftet dem.",
    },
  ],

  faq: [
    {
      question: "Når åpner påmeldingen?",
      answer:
        "Åpningsdato og klokkeslett for neste arrangement publiseres her så snart arrangøren har bekreftet dem.",
    },
    {
      question: "Hva gjør jeg hvis løpet blir fullt?",
      answer:
        "Informasjon om venteliste, restplasser og eventuelle nye puljer vises tydelig her dersom ordinær påmelding blir fulltegnet.",
    },
    {
      question: "Kan jeg endre deltaker etter påmelding?",
      answer:
        "Regler og frister for navnebytte og andre endringer publiseres her for hvert arrangement.",
    },
    {
      question: "Hvor finner jeg startnummeret mitt?",
      answer:
        "Når startlisten er publisert finner du startnummer og deltakerinformasjon under Start & resultater.",
    },
  ],
} as const;
