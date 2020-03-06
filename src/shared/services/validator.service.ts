import * as _ from 'lodash';
import { Injectable } from '@nestjs/common';
export const imageMimeTypes = ['image/jpeg', 'image/png'];

@Injectable()
export default class ValidatorService {
  public isImage(mimeType: string): boolean {
    return _.includes(imageMimeTypes, mimeType);
  }
}
