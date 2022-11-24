class ChainedNodeIterator<T> implements Iterator<ChainedNode<T>> {
  private node: ChainedNode<T>;
  constructor(node: ChainedNode<T>) {
    this.node = node;
  }
  next(...args: [] | [undefined]): IteratorResult<ChainedNode<T>, any> {
    if (this.node) {
      const current = this.node;
      this.node = this.node.next!;
      return { done: false, value: current };
    } else return { done: true, value: undefined };
  }
}

class ChainedNode<T> implements Iterable<ChainedNode<T>> {
  value: T;
  next: ChainedNode<T> | null;
  constructor(value: T, next: ChainedNode<T> | null = null) {
    this.value = value;
    this.next = next;
  }
  [Symbol.iterator](): Iterator<ChainedNode<T>, any, undefined> {
    return new ChainedNodeIterator(this);
  }
}

function main(): void {
  const node3 = new ChainedNode("San");
  const node2 = new ChainedNode("Ni", node3);
  const node1 = new ChainedNode("Ichi", node2);

  for (const val of node1) {
    console.log(val.value);
  }
}

main();
