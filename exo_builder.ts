class Burger {
  pain: string | null = null;
  crudites: string[] = [];
  sauces: string[] = [];
  isVegan: boolean = false;

  humanReadable(): string {
    return `Burger ${this.isVegan ? "vegan" : "non vegan"} ${
      this.pain
    } sauce ${this.sauces.join(",")} avec ${this.crudites.join(", ")}.`;
  }
}

class BurgerBuilder {
  private burger = new Burger();

  setPain(pain: string): BurgerBuilder {
    this.burger.pain = pain;
    return this;
  }

  setIsVegan(isVegan: boolean): BurgerBuilder {
    this.burger.isVegan = isVegan;
    return this;
  }

  addOrRemoveCrudites(crudite: string): BurgerBuilder {
    if (this.burger.crudites.includes(crudite)) {
      this.burger.crudites.filter((c) => c != crudite);
    } else {
      this.burger.crudites.push(crudite);
    }
    return this;
  }

  addOrRemoveSauce(crudite: string): BurgerBuilder {
    if (this.burger.sauces.includes(crudite)) {
      this.burger.sauces.filter((c) => c != crudite);
    } else {
      this.burger.sauces.push(crudite);
    }
    return this;
  }

  getinstance(): Burger {
    return this.burger;
  }
}

function main(): void {
  const burgerBuilder = new BurgerBuilder();
  burgerBuilder
    .setIsVegan(false)
    .addOrRemoveCrudites("Salade")
    .addOrRemoveCrudites("Tomate")
    .addOrRemoveCrudites("Cornichon")
    .addOrRemoveSauce("Burger")
    .setPain("Pain Brioché");

  console.log(burgerBuilder.getinstance().humanReadable());
}

main();
