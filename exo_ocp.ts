enum Feeling {
  normal = "normal",
  awake = "reveillé",
  rest = "reposé",
  full = "rassasié",
}

interface Boisson {
  name: string;
  calories: number;
  feeling: Feeling;

  buPar(client: Client): void;
}

class Client {
  feeling = Feeling.normal;
  energy = 1000;
}

class Cafe implements Boisson {
  name: string;
  calories: number;
  feeling: Feeling;

  constructor() {
    this.name = "CAFE";
    this.calories = 1;
    this.feeling = Feeling.awake;
  }

  buPar(client: Client) {
    client.feeling = this.feeling;
    client.energy += this.calories;
  }
}

class Tisane implements Boisson {
  name: string;
  calories: number;
  feeling: Feeling;

  constructor() {
    this.name = "Tisane";
    this.calories = 1;
    this.feeling = Feeling.rest;
  }

  buPar(client: Client) {
    client.feeling = this.feeling;
    client.energy += this.calories;
  }
}

class Soupe implements Boisson {
  name: string;
  calories: number;
  feeling: Feeling;

  constructor() {
    this.name = "SOUPE";
    this.calories = 1000;
    this.feeling = Feeling.full;
  }

  buPar(client: Client) {
    client.feeling = this.feeling;
    client.energy += this.calories;
  }
}

class Poison implements Boisson {
  name: string;
  calories: number;
  feeling: Feeling;

  constructor() {
    this.name = "Poison";
    this.calories = 0;
    this.feeling = Feeling.full;
  }

  buPar(client: Client) {
    client.feeling = this.feeling;
    client.energy = this.calories;
  }
}

class Reserve {
  static getCafe(): Boisson {
    return new Cafe();
  }

  static getTisane(): Boisson {
    return new Tisane();
  }

  static getSoupe(): Boisson {
    return new Soupe();
  }

  static getPoison(): Boisson {
    return new Poison();
  }
}

function main(): void {
  const client = new Client();
  console.log(client);
  const cafe = Reserve.getCafe();
  cafe.buPar(client);
  console.log(client);
  const poison = Reserve.getPoison();
  poison.buPar(client);
  const tisane = Reserve.getTisane();
  tisane.buPar(client);
  console.log(client);
  const soupe = Reserve.getSoupe();
  soupe.buPar(client);
  console.log(client);
}

main();
