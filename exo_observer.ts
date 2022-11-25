interface TwitchEvent {
  type: string;
}

class IsStreamingEvent implements TwitchEvent {
  type: string;
  constructor() {
    this.type = "isStreaming";
  }
}

interface TwitchObserver {
  notify(event: TwitchEvent): void;
}

class Account implements TwitchObserver {
  username: string;

  constructor(username: string) {
    this.username = username;
  }

  notify(event: TwitchEvent): void {
    console.log(`${this.username} recived event : ${event.type}`);
  }
}

class Streamer extends Account {
  private followers: Account[];
  private subscribers: Account[];
  private replays: string[];

  constructor(username: string, replays: string[]) {
    super(username);
    this.followers = [];
    this.subscribers = [];
    this.replays = replays;
  }

  follow(account: Account) {
    if (this.followers.includes(account)) {
      this.followers.filter((follower) => follower !== account);
    } else {
      this.followers.push(account);
    }
  }

  subscribe(account: Account) {
    if (this.subscribers.includes(account)) {
      this.subscribers.filter((follower) => follower !== account);
    } else {
      this.subscribers.push(account);
    }
  }

  notifyAll(): void {
    this.notifySubscribers();
    setTimeout(this.notifyFollowers.bind(this), 1000);
  }

  private notifyFollowers(): void {
    this.followers.forEach((account) => account.notify(new IsStreamingEvent()));
  }

  private notifySubscribers(): void {
    this.subscribers.forEach((account) =>
      account.notify(new IsStreamingEvent())
    );
  }

  getReplays(subscriber: Account): string[] {
    if (this.subscribers.includes(subscriber)) {
      return this.replays;
    }
    throw new Error(
      `${subscriber.username} is not subscribed to ${this.username}`
    );
  }
}

function main(): void {
  const dakotaz = new Streamer("Dakotaz", [
    "OMG 360 no scope",
    "State of my channel...",
  ]);

  const user1 = new Account("GET_MOUSSED");
  const user2 = new Account("FloiLY");

  dakotaz.follow(user1);
  dakotaz.subscribe(user2);

  dakotaz.notifyAll();

  try {
    dakotaz.getReplays(user1);
  } catch (e) {
    console.log(e);
  }
  console.log(dakotaz.getReplays(user2));
}

main();
