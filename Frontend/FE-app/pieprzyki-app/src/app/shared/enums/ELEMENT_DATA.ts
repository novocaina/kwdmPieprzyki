export const ELEMENT_DATA: ClientData[] = [
  {
    name: 'Monika',
    surname: 'Nowak',
    address: 'ul. Mikołowka 5/3, Warszawa',
    examination: 'Badanie 1',
    description: '',
    medicamention: 'Brak'
  },
  {
    name: 'Patryk',
    surname: 'Megger',
    address: 'ul. Zlota 34/5',
    examination: 'Badanie 2',
    description: '',
    medicamention: 'Brak'
  },
  {
    name: 'Katarzyna',
    surname: 'Błędna',
    address: 'ul. Kwiatowa 4, Ruda Śląska',
    examination: 'Badanie 1',
    description: '',
    medicamention: 'Brak'
  },
  {
    name: 'Zbigniew',
    surname: 'Tomalczyk',
    address: 'ul. Adamsów 22',
    examination: 'Badanie 1',
    description: '',
    medicamention: 'Brak'
  },
  {
    name: 'Adam',
    surname: 'Kowalski',
    address: 'ul. Zamości 54, Zebrzydowice',
    examination: 'Badanie 2',
    description: 'Brak widocznych zmian złośliwych',
    medicamention: 'Brak'
  },
];

export interface ClientData {
  name: string;
  surname: string;
  address: string;
  examination: string;
  description: string;
  medicamention: string;
}
