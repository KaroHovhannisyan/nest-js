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
import { RecourseIsInvalidException } from '../../exceptions/recourse-is-invalid.exception';

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
      return await this.userService.create(userRegisterDto)
    } catch (e) {
      throw new RecourseAlreadyExistsException('Email');
    }
  }

  async createToken(user: User | UserDto): Promise<TokenPayloadDto> {
    return new TokenPayloadDto({
      accessToken: await this.jwtService.signAsync({ id: user.id }),
    });
  }

  async validateUser(userLoginDto: UserLoginDto, errorMessage?: string): Promise<UserDto> {
    const user = await this.userService.findOne({
      email: userLoginDto.email,
    });
    const isPasswordValid = await this.utilService.validateHash(
      userLoginDto.password,
      user && user.password,
    );
    console.log(isPasswordValid, user)
    if (!user || !isPasswordValid) {
      throw new UserNotFoundException(errorMessage || "Wrong email or password");
    }
    return user;
  }


  async resetPassword(email: string): Promise<any> {
      const user = await this.userService.findOne({ email });
      if(!user){
        throw new RecourseNotExistsException('User');
      }
      const tokenInfo: IToken = this.utilService.createToken();
      await this.tokenService.create(user.id, tokenInfo, TOKEN_REASONS.RESET_PASSWORD);
      await this.mailService.sendMail(email, {
        template: "d-307803cbe66e4ac88691e1ddbf3b5678",
        templateData: {forgotPasswordConfirmationLink: this.mailService.getForgotPasswordConfirmationUrl("http://localhost:3000", tokenInfo.token)}
      });
  }

  async verifyPassword(data: any): Promise<any>{
    throw new RecourseIsInvalidException("Token")
  }

  async changePassword(user: User, changePasswordDto: ChangePasswordDto): Promise<any> {
       const userLoginDto: UserLoginDto = {
         email: user.email,
         password: changePasswordDto.currentPassword
       };
       await this.validateUser(userLoginDto, "Wrong password");
       await this.userService.updateById(user.id, { password: this.utilService.generateHash(changePasswordDto.newPassword)});
  }
}
