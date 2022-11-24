class USB_C {
  name: string;
  type = "Type C";
  constructor(name: string = "generic device") {
    this.name = name;
  }
  connectToTypeC(): string {
    return `${this.name} (${this.type}) is connecting to port ${this.type}`;
  }
}

class Charger extends USB_C {
  constructor() {
    super("Charger");
  }
}

class USB_A {
  name: string;
  type = "Type A";
  constructor(name: string = "generic device") {
    this.name = name;
  }
  connectToTypeA(): string {
    return `${this.name} (${this.type}) connecting to port ${this.type}`;
  }
}

class USB_C_TO_A_ADAPTER extends USB_A {
  constructor(private usb_c_device: USB_C) {
    super("Adapter");
  }
  connectToTypeA(): string {
    return `${this.usb_c_device.name} (${this.usb_c_device.type}) is connecing to ${this.name} (${this.type})`;
  }
}

function main(): void {
  const charger = new Charger();
  console.log(charger.connectToTypeC());
  const usb_a_adapter = new USB_C_TO_A_ADAPTER(charger);
  console.log(usb_a_adapter.connectToTypeA());
}

main();
