enum ProductName {
  McFirstPoulet = "Mc first poulet",
  McFirstBoeuf = "Mc first boeuf",
  GrandCoca = "Grand coca",
  McFlurry = "Mc Flurry",
  Nuggets = "Nuggets",
}

enum PaymentMethodsName {
  CB = "Carte banquaire",
  Cash = "Espece",
  DogeCoin = "Dogecoin",
}

interface McProduct {
  name: ProductName;
  price: number;
}

class McFirstBoeuf implements McProduct {
  name: ProductName = ProductName.McFirstBoeuf;
  price: number = 5;
}

class McFirstPoulet implements McProduct {
  name: ProductName = ProductName.McFirstPoulet;
  price: number = 5;
}

class GrandCoca implements McProduct {
  name: ProductName = ProductName.GrandCoca;
  price: number = 2;
}

class Nuggets implements McProduct {
  name: ProductName = ProductName.Nuggets;
  price: number = 5;
}

class McFlurry implements McProduct {
  name: ProductName = ProductName.McFlurry;
  price: number = 4.5;
}

class McReserve {
  static getNuggets(): McProduct {
    return new Nuggets();
  }

  static getGrandCoca(): McProduct {
    return new GrandCoca();
  }

  static getMcFlurry(): McProduct {
    return new McFlurry();
  }

  static getMcFirstBoeuf(): McProduct {
    return new McFirstBoeuf();
  }

  static getMcFirstPoulet(): McProduct {
    return new McFirstPoulet();
  }
}

class Qte {
  qte: number;
  mcProduct: McProduct;

  constructor(qte: number, mcProduct: McProduct) {
    this.qte = qte;
    this.mcProduct = mcProduct;
  }
}

class ShoppingCart {
  products: Qte[] = [];
  addItem(product: McProduct) {
    const qte = this.products.find(
      (qte) => qte.mcProduct.name === product.name
    );
    if (qte) {
      qte.qte += 1;
    } else {
      this.products.push(new Qte(1, product));
    }
  }

  removeItem(product: McProduct) {
    const qte = this.products.find(
      (qte) => qte.mcProduct.name === product.name
    );
    if (qte && qte.qte > 1) {
      qte.qte -= 1;
    } else {
      this.products.filter((qte) => qte.mcProduct === product);
    }
  }

  calcPriceTotal(): number {
    return this.products.reduce(
      (prev, qte) => prev + qte.qte * qte.mcProduct.price,
      0
    );
  }
}

interface PaymentMethods {
  call(): string;
}

class CB implements PaymentMethods {
  call(): string {
    return `${PaymentMethodsName.CB}`;
  }
}

class Cash implements PaymentMethods {
  call(): string {
    return `${PaymentMethodsName.Cash}`;
  }
}

class DogeCoin implements PaymentMethods {
  call(): string {
    return `${PaymentMethodsName.DogeCoin}`;
  }
}

class McDoDrive {
  cart: ShoppingCart = new ShoppingCart();

  pickItem(product: ProductName) {
    switch (product) {
      case ProductName.GrandCoca:
        this.cart.addItem(McReserve.getGrandCoca());
        break;
      case ProductName.Nuggets:
        this.cart.addItem(McReserve.getNuggets());
        break;
      case ProductName.McFirstBoeuf:
        this.cart.addItem(McReserve.getMcFirstBoeuf());
        break;
      case ProductName.McFirstPoulet:
        this.cart.addItem(McReserve.getMcFirstPoulet());
        break;
      case ProductName.McFlurry:
        this.cart.addItem(McReserve.getMcFlurry());
        break;
      default:
        break;
    }
  }

  removeItem(product: ProductName) {
    switch (product) {
      case ProductName.GrandCoca:
        this.cart.removeItem(McReserve.getGrandCoca());
        break;
      case ProductName.Nuggets:
        this.cart.removeItem(McReserve.getNuggets());
        break;
      case ProductName.McFirstBoeuf:
        this.cart.removeItem(McReserve.getMcFirstBoeuf());
        break;
      case ProductName.McFirstPoulet:
        this.cart.removeItem(McReserve.getMcFirstPoulet());
        break;
      case ProductName.McFlurry:
        this.cart.removeItem(McReserve.getMcFlurry());
        break;
      default:
        break;
    }
  }

  command(): string {
    return (
      this.cart.products.reduce(
        (prev, qte) =>
          `${qte.qte} ${qte.mcProduct.name} - ${
            qte.qte * qte.mcProduct.price
          }$\n${prev}`,
        ""
      ) + `Total ${this.cart.calcPriceTotal()}$`
    );
  }

  pay(method: PaymentMethodsName): string {
    let payProvider: PaymentMethods | null = null;

    switch (method) {
      case PaymentMethodsName.CB:
        payProvider = new CB();
        break;
      case PaymentMethodsName.Cash:
        payProvider = new Cash();
        break;
      case PaymentMethodsName.DogeCoin:
        payProvider = new DogeCoin();
        break;
      default:
        break;
    }
    if (payProvider)
      return `Paimement en ${payProvider.call()} pour un total de ${this.cart.calcPriceTotal()}$`;
    else return `impossible de payer`;
  }
}

function main(): void {
  const drive: McDoDrive = new McDoDrive();

  drive.pickItem(ProductName.GrandCoca);
  drive.pickItem(ProductName.McFirstPoulet);
  drive.pickItem(ProductName.McFirstPoulet);
  drive.pickItem(ProductName.Nuggets);
  drive.pickItem(ProductName.Nuggets);
  drive.pickItem(ProductName.Nuggets);

  // oops 🤷🏿
  drive.removeItem(ProductName.Nuggets);
  drive.pickItem(ProductName.McFlurry);

  console.log(drive.command());

  console.log(drive.pay(PaymentMethodsName.DogeCoin));
}

main();
