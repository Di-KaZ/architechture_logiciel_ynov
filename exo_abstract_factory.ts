interface Buvable {
  name: string;
  boire(): void;
}

interface Mangeable {
  name: string;
  manger(): void;
  creerGouter(buvable: Buvable): string;
}

class Zup implements Buvable {
  name: string;

  constructor() {
    this.name = "Zup";
  }

  boire(): void {
    console.log("à bu un Zup");
  }
}

class Kombucha implements Buvable {
  name: string;

  constructor() {
    this.name = "Kombucha";
  }

  boire(): void {
    console.log("à bu son Kombucha");
  }
}

class CookieSansGluten implements Mangeable {
  name: string;

  constructor() {
    this.name = "Cookie sans gluten";
  }

  manger(): void {
    console.log("à manger son cookie");
  }

  creerGouter(buvable: Buvable): string {
    return `à fait son gouter avec un cookie bon pour la santé  et boie un(e) ${buvable.name} de façon raisonée`;
  }
}

class Snickers implements Mangeable {
  name: string;

  constructor() {
    this.name = "Snickers";
  }

  manger(): void {
    console.log("à manger un snickers");
  }

  creerGouter(buvable: Buvable): string {
    return `graille son meilleur snickers et boie un(e) ${buvable.name} d'un coup`;
  }
}

interface Reserve {
  getBuvable(): Buvable;
  getMangeable(): Mangeable;
}

class MagasinBio implements Reserve {
  getBuvable(): Buvable {
    return new Kombucha();
  }

  getMangeable(): Mangeable {
    return new CookieSansGluten();
  }
}

class DistributeurAuto implements Reserve {
  getBuvable(): Buvable {
    return new Zup();
  }

  getMangeable(): Mangeable {
    return new Snickers();
  }
}

class Personne {
  name: string;
  buvable: Buvable;
  mangeable: Mangeable;

  constructor(reserve: Reserve, name: string) {
    this.name = name;
    this.buvable = reserve.getBuvable();
    this.mangeable = reserve.getMangeable();
  }

  apprecierSonGouter(): string {
    return `${this.name} ${this.mangeable.creerGouter(this.buvable)}`;
  }
}

function main(): void {
  const moussa = new Personne(new DistributeurAuto(), "Moussa");
  const nono = new Personne(new MagasinBio(), "Nono");

  console.log(moussa.apprecierSonGouter());
  console.log(nono.apprecierSonGouter());
}

main();
