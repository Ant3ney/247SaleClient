class Writer {
  view: DataView;
  index: number;
  maxIndex: number;

  constructor (bytes: number = 128) {
    const buffer: ArrayBuffer = new ArrayBuffer(bytes);
    this.view = new DataView(buffer);
    this.index = 0;
    this.maxIndex = bytes;
  }

  writeInt8(value: number): void {
    this.view.setInt8(this.index, value);
    this.index += 1;
  }

  writeUInt8(value: number): void {
    this.view.setUint8(this.index, value);
    this.index += 1;
  }

  writeInt16(value: number): void {
    this.view.setInt16(this.index, value, true);
    this.index += 2;
  }

  writeUInt16(value: number): void {
    this.view.setUint16(this.index, value, true);
    this.index += 2;
  }

  writeInt32(value: number): void {
    this.view.setInt32(this.index, value, true);
    this.index += 4;
  }

  writeUInt32(value: number): void {
    this.view.setUint32(this.index, value, true);
    this.index += 4;
  }

  writeFloat(value: number): void {
    this.view.setFloat32(this.index, value, true);
    this.index += 4;
  }

  writeDouble(value: number): void {
    this.view.setFloat64(this.index, value, true);
    this.index += 8;
  }

  writeString8(value: string): void {
    this.writeUInt8(value.length);
    for (let i: number = 0; i < value.length; i++) {
      const charCode: number = value.charCodeAt(i);
      this.writeUInt8(charCode);
    }
  }

  writeLongString8(value: string): void {
    this.writeUInt16(value.length);
    for (let i: number = 0; i < value.length; i++) {
      const charCode: number = value.charCodeAt(i);
      this.writeUInt8(charCode);
    }
  }

  writeString16(value: string): void {
    this.writeUInt8(value.length);
    for (let i: number = 0; i < value.length; i++) {
      const charCode: number = value.charCodeAt(i);
      this.writeUInt16(charCode);
    }
  }

  writeLongString16(value: string): void {
    this.writeUInt16(value.length);
    for (let i: number = 0; i < value.length; i++) {
      const charCode: number = value.charCodeAt(i);
      this.writeUInt16(charCode);
    }
  }

  encodeString(string: string): string {
    return encodeURI(string);
  }

  reset(): void {
    this.index = 0;
  }

  get buffer(): ArrayBuffer {
    const buffer = this.view.buffer;
    return this.index === this.maxIndex ? buffer : buffer.slice(0, this.index);
  }
}

export default Writer;
