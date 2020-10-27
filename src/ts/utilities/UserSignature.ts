class UserSignature {
  readonly length: number = 6;
  readonly chars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generateNew(): string {
    let userSignature: string = '';
    for (let i = 0; i < this.length; i++) {
      const index: number = Math.random() * this.chars.length | 0;
      userSignature += this.chars[index];
    }
    localStorage.setItem('userSignature', userSignature);
    return userSignature;
  }

  get(): string {
    let userSignature: string = localStorage.getItem('userSignature') || this.generateNew();
    return userSignature;
  }
}

export default new UserSignature();
