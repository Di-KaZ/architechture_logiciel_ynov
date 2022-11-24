import { v4 as uuidv4 } from "uuid";

class Signleton {
  static _instance: Signleton;

  uuid: string;
  private constructor() {
    this.uuid = uuidv4();
  }

  static getInstance(): Signleton {
    if (this._instance == null) {
      this._instance = new Signleton();
    }
    return this._instance;
  }
}

function main(): void {
  console.log(Signleton.getInstance().uuid);
  console.log(Signleton.getInstance().uuid);
  console.log(Signleton.getInstance().uuid);
  console.log(Signleton.getInstance().uuid);
}

main();
