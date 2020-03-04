import { Injectable } from '@nestjs/common';
import { User } from '../../models/User';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserService } from '../user/user.service';
import { RecourseAlreadyExistsException } from '../../exceptions/recourse-already-exists.exception';
import { UserDto } from '../user/dto/UserDto';
import { TokenPayloadDto } from './dto/TokenPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { UtilsService } from '../../providers/utils.service';
import { UserNotFoundException } from '../../exceptions/user-not-found.exception';
import { JwtService } from '@nestjs/jwt';
import { RecourseNotExistsException } from '../../exceptions/recourse-not-exists.exception';
import { MailService } from '../../shared/services/mail-service';
import { IToken } from '../../interfaces/IToken';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { TokenService } from '../../shared/services/token.service';
import { TOKEN_REASONS } from '../../common/constants/token-reason';
import { ResourceIsInvalidException } from '../../exceptions/recourse-is-invalid.exception';
import { ConfirmPasswordDto } from './dto/ConfirmPasswordDto';
import { PermissionDeniedException } from '../../exceptions/permission-denied-exception';

@Injectable()
export class AuthService {
  constructor(
    public readonly userService: UserService,
    public readonly jwtService: JwtService,
    public readonly mailService: MailService,
    public readonly utilService: UtilsService,
    public readonly tokenService: TokenService,
  ) {}

  async create(userRegisterDto: UserRegisterDto): Promise<User> {
    try {
      return await this.userService.create(userRegisterDto);
    } catch (e) {
      throw new RecourseAlreadyExistsException('Email');
    }
  }

  async createToken(user: User | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync({ id: user.id }),
    });
  }

  async validateUser(
    userLoginDto: UserLoginDto,
    errorMessage?: string,
  ): Promise<UserDto> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await this.utilService.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    console.log(isPasswordValid, user);
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException(
        errorMessage || 'Wrong email or password',
      );
    }
    return user;
  }

  async resetPassword(email: string): Promise<any> {
    const user = await this.userService.findOne({ email });
    if (!user) {
      throw new RecourseNotExistsException('User');
    }
    const tokenInfo: IToken = this.utilService.createToken();
    await this.tokenService.create(
      user.id,
      tokenInfo,
      TOKEN_REASONS.RESET_PASSWORD,
    );
    await this.mailService.sendResetPasswordEmail(email, tokenInfo.token);
  }

  async resetPasswordVerify(data: ConfirmPasswordDto): Promise<any> {
    const tokenData = await this.tokenService.getByTokenAndReason(
      data.token,
      TOKEN_REASONS.RESET_PASSWORD,
    );
    if (!tokenData) throw new ResourceIsInvalidException('Token');
    const user: any = await this.userService.findOne({ id: tokenData.userId }); //todo
    await this.userService.updateById(user.id, {
      password: this.utilService.generateHash(data.password),
    });
    await this.tokenService.removeById(user.id);
  }

  async changePassword(
    user: User,
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    const userLoginDto: UserLoginDto = {
      email: user.email,
      password: changePasswordDto.currentPassword,
    };
    await this.validateUser(userLoginDto, 'Wrong password');
    await this.userService.updateById(user.id, {
      password: this.utilService.generateHash(changePasswordDto.newPassword),
    });
  }
}
