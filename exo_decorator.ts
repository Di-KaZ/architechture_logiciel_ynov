interface ISushi {
  eat(): string;
}

class Sushi implements ISushi {
  constructor() {}

  eat(): string {
    return "sushi";
  }
}

interface SushiDecorator extends ISushi {
  sushi: Sushi;
}

class Wasabi implements SushiDecorator {
  sushi: ISushi;
  constructor(sushi: Sushi) {
    this.sushi = sushi;
  }
  eat(): string {
    return `${this.sushi.eat()}, topping wasabi`;
  }
}

class SauceSojaSucree implements SushiDecorator {
  sushi: ISushi;
  constructor(sushi: Sushi) {
    this.sushi = sushi;
  }
  eat(): string {
    return `${this.sushi.eat()}, a la Sauce soja sucrée`;
  }
}

class SauceSojaSalee implements SushiDecorator {
  sushi: ISushi;
  constructor(sushi: Sushi) {
    this.sushi = sushi;
  }
  eat(): string {
    return `${this.sushi.eat()}, a la Sauce soja salée`;
  }
}

class Gingembre implements SushiDecorator {
  sushi: ISushi;
  constructor(sushi: Sushi) {
    this.sushi = sushi;
  }
  eat(): string {
    return `${this.sushi.eat()}, topping Gingembre`;
  }
}

function main(): void {
  const chefSpecial = new Gingembre(
    new SauceSojaSalee(new SauceSojaSucree(new Wasabi(new Sushi())))
  );
  console.log(chefSpecial.eat());
}

main();
