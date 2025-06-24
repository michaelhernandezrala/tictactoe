class Token {
  private value: string;

  public constructor(value: string) {
    this.value = value;
  }

  public getValue(): string {
    return this.value;
  }
}

export default Token;
