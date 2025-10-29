export class SoftAssert {
  private errors: string[] = [];

  log(condition: boolean, message: string) {
    if (!condition) {
      this.errors.push(message);
      console.warn("[SoftAssert]", message);
    }
  }

  getErrors() {
    return this.errors;
  }

  hasErrors() {
    return this.errors.length > 0;
  }

  assertAll() {
    if (this.errors.length > 0) {
      throw new Error(`Soft Assertion Failures:\n${this.errors.join("\n")}`);
    }
  }
}

// export class SoftAssert {
// private errors: string[] = [];


// log(condition: boolean, message: string) {
// if (!condition) {
// this.errors.push(message);
// console.warn('[SoftAssert] ' + message);
// }
// }


// hasErrors() { return this.errors.length > 0; }
// getErrors() { return this.errors.slice(); }
// }