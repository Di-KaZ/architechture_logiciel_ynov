interface IPrinterBase {
  print(printContent: string): void;
  scan(scanCotent: string): void;
}

interface IPrinterFax {
  fax(faxContent: string): void;
}

interface IPrinteruplex {
  printDuplex(duplexContent: string): void;
}

class HPLaserJetPrinter implements IPrinterBase, IPrinterFax, IPrinteruplex {
  print(printContent: string) {
    console.log("print done");
  }

  scan(scanCotent: string) {
    console.log("scan done");
  }

  fax(faxContent: string) {
    console.log("fax done");
  }

  printDuplex(duplexContent: string) {
    console.log("duplex done");
  }
}

class LiquidInkjetPrinter implements IPrinterBase {
  scan(scanCotent: string) {
    console.log("scan done");
  }

  print(printContent: string) {
    console.log("print done");
  }
}
