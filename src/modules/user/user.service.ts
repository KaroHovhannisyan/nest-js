import { Inject, Injectable } from '@nestjs/common';
import { UserRegisterDto } from '../auth/dto/UserRegisterDto';
import { User } from '../../models/User';
import { UserDto } from './dto/UserDto';
import { ValidatorService } from '../../shared/services/validator.service';
import { FileNotImageException } from '../../exceptions/file-not-image.exception';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { IFile } from '../../interfaces/IFile';

@Injectable()
export class UserService {
  SERVER_URL:  string  =  "http://localhost:3000/";
  constructor(
  @Inject('UserRepository')
    private readonly userRepository: typeof User,
    public readonly validatorService: ValidatorService,
  ) {}

  /**
   * Find single user
   */
  async findOne(findData: any): Promise<UserDto | null> {
    return await this.userRepository.findOne({ where: findData });
  }

  /**
   * Update User
   * @param id
   * @param newValues
   */

  async updateById(id: number, newValues: any): Promise<User | null> {
    //todo
    return await this.userRepository.update(newValues, {
      returning: true,
      where: { id },
    });
  }

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    return await this.userRepository.create<User>(userRegisterDto);
  }

  async changeUserProfile(user: User, data: any): Promise<User> {
    //todo
    await this.updateById(user.id, data);
    return data;
  }

  async uploadImage(user: User, file: IFile): Promise<string> {
    await this.updateById(user.id, {imageUrl: `${file.path}`});
    return file.path;
  }
}
