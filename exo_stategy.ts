interface SharingProvider {
  share(url: string): string;
}

class ShareGoogle implements SharingProvider {
  share(url: string): string {
    return `using google to share ${url}`;
  }
}

class ShareIOS implements SharingProvider {
  share(url: string): string {
    return `using ios to share ${url}`;
  }
}

class ShareMessages implements SharingProvider {
  share(url: string): string {
    return `using messages to share ${url}`;
  }
}

class ShareClipboard implements SharingProvider {
  share(url: string): string {
    return `using clipboard to share ${url}`;
  }
}
class Imagee {
  url: string;

  constructor(url: string) {
    this.url = url;
  }

  share(shareProvider: SharingProvider): string {
    return shareProvider.share(this.url);
  }
}

function main(): void {
  const image = new Imagee("https://cool-url.png");
  console.log(image.share(new ShareGoogle()));
  console.log(image.share(new ShareIOS()));
  console.log(image.share(new ShareMessages()));
  console.log(image.share(new ShareClipboard()));
}

main();
