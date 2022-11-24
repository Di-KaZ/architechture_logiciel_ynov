import { v4 as uuidv4 } from "uuid";

interface Command {
  calque: Calque;
  app: App;
  uuid: string;

  execute(): void;
  undo(): void;
}

interface Shape {
  uuid: string;
  content: string;
}

class DrawRetangle implements Command {
  uuid: string;
  calque: Calque;
  app: App;
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(
    app: App,
    calque: Calque,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    this.uuid = uuidv4();
    this.app = app;
    this.calque = calque;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  execute(): void {
    this.calque.content.push({
      uuid: this.uuid,
      content: `draw rectangle at ${this.x},${this.y} - ${this.width}x${this.height}}`,
    });
  }

  undo(): void {
    this.calque.content = this.calque.content.filter(
      (c) => c.uuid !== this.uuid
    );
  }
}

class DrawCircle implements Command {
  uuid: string;
  calque: Calque;
  app: App;
  x: number;
  y: number;
  raidus: number;

  constructor(app: App, calque: Calque, x: number, y: number, radius: number) {
    this.uuid = uuidv4();
    this.app = app;
    this.calque = calque;
    this.x = x;
    this.y = y;
    this.raidus = radius;
  }

  execute(): void {
    this.calque.content.push({
      uuid: this.uuid,
      content: `draw circle at ${this.x},${this.y} - r${this.raidus}`,
    });
  }

  undo(): void {
    this.calque.content = this.calque.content.filter(
      (c) => c.uuid !== this.uuid
    );
  }
}

class DrawLine implements Command {
  uuid: string;
  calque: Calque;
  app: App;
  x: number;
  y: number;
  x2: number;
  y2: number;

  constructor(
    app: App,
    calque: Calque,
    x: number,
    y: number,
    x2: number,
    y2: number
  ) {
    this.uuid = uuidv4();
    this.app = app;
    this.calque = calque;
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }

  execute(): void {
    this.calque.content.push({
      uuid: this.uuid,
      content: `draw line at ${this.x},${this.y} - ${this.x2},${this.y2}`,
    });
  }

  undo(): void {
    this.calque.content = this.calque.content.filter(
      (c) => c.uuid !== this.uuid
    );
  }
}

class Calque {
  commands: Command[];
  content: Shape[];
  constructor() {
    this.commands = [];
    this.content = [];
  }
}

class App {
  calque: Calque;
  constructor(calque: Calque) {
    this.calque = calque;
  }

  execute(command: Command) {
    command.execute();
    this.calque.commands.push(command);
  }

  undo() {
    if (!this.calque.commands.length) return;
    const command = this.calque.commands.pop();
    command!.undo();
  }
}

function main(): void {
  const calque = new Calque();
  const app = new App(calque);
  const circleCommand = new DrawCircle(app, calque, 2, 6, 12);
  const lineCommand = new DrawLine(app, calque, 2, 6, 12, 77);
  const squareCommand = new DrawRetangle(app, calque, 2, 2, 2, 2);
  app.execute(circleCommand);
  app.execute(squareCommand);
  app.execute(lineCommand);
  console.log(app.calque.commands.map((c) => c.uuid));
  console.log(app.calque.content.map((shape) => shape.content));

  app.undo();
  console.log(app.calque.commands.map((c) => c.uuid));
  console.log(app.calque.content.map((shape) => shape.content));

  app.undo();
  console.log(app.calque.commands.map((c) => c.uuid));
  console.log(app.calque.content.map((shape) => shape.content));

  app.undo();
  console.log(app.calque.commands.map((c) => c.uuid));
  console.log(app.calque.content.map((shape) => shape.content));
}

main();
