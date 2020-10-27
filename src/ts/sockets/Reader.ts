class Reader {
  view: DataView;
  index: number;
  maxIndex: number;

  constructor(buffer: ArrayBuffer) {
    this.view = new DataView(buffer);
    this.index = 0;
    this.maxIndex = buffer.byteLength;
  }

  readInt8(): number {
    const value: number = this.view.getInt8(this.index);
    this.index += 1;
    return value;
  }

  readUInt8(): number {
    const value: number = this.view.getUint8(this.index);
    this.index += 1;
    return value;
  }

  readInt16(): number {
    const value: number = this.view.getInt16(this.index, true);
    this.index += 2;
    return value;
  }

  readUInt16(): number {
    const value: number = this.view.getUint16(this.index, true);
    this.index += 2;
    return value;
  }

  readInt32(): number {
    const value: number = this.view.getInt32(this.index, true);
    this.index += 4;
    return value;
  }

  readUInt32(): number {
    const value: number = this.view.getUint32(this.index, true);
    this.index += 4;
    return value;
  }

  readFloat(): number {
    const value: number = this.view.getFloat32(this.index, true);
    this.index += 4;
    return value;
  }

  readDouble(): number {
    const value: number = this.view.getFloat64(this.index, true);
    this.index += 8;
    return value;
  }

  readString8(): string {
    const length: number = this.readUInt8();
    let value: string = '';
    for (let i: number = 0; i < length; i++) {
      if (this.end) break;
      const charCode: number = this.readUInt8();
      value += String.fromCharCode(charCode);
    }
    return value;
  }

  readLongString8(): string {
    const length: number = this.readUInt16();
    let value: string = '';
    for (let i: number = 0; i < length; i++) {
      if (this.end) break;
      const charCode: number = this.readUInt8();
      value += String.fromCharCode(charCode);
    }
    return value;
  }

  readString16(): string {
    const length: number = this.readUInt8();
    let value: string = '';
    for (let i: number = 0; i < length; i++) {
      if (this.end) break;
      const charCode: number = this.readUInt16();
      value += String.fromCharCode(charCode);
    }
    return value;
  }

  readLongString16(): string {
    const length: number = this.readUInt16();
    let value: string = '';
    for (let i: number = 0; i < length; i++) {
      if (this.end) break;
      const charCode: number = this.readUInt16();
      value += String.fromCharCode(charCode);
    }
    return value;
  }

  decodeString(encoded: string): string {
    return decodeURI(encoded);
  }

  get bytesLeft(): number {
    return this.maxIndex - this.index;
  }

  get end(): boolean {
    return this.index === this.maxIndex;
  }
}

export default Reader;
