import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';

@Injectable()
export default class GeneratorService {
  public uuid(): string {
    return uuid();
  }
  public fileName(ext: string) {
    return this.uuid() + '.' + ext;
  }
}
