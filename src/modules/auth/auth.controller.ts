import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  UseGuards, Get, Param,
} from '@nestjs/common';
import { UserRegisterDto } from './dto/UserRegisterDto';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserDto } from '../user/dto/UserDto';
import { AuthService } from './auth.service';
import { LoginPayloadDto } from './dto/LoginPayloadDto';
import { UserLoginDto } from './dto/UserLoginDto';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { User } from '../../models/User';
import { ResetPasswordDto } from './dto/ResetPasswordDto';
import { ChangePasswordDto } from './dto/ChangePasswordDto';
import { ConfirmPasswordDto } from './dto/ConfirmPasswordDto';
import { Roles } from '../../decorators/roles.decorator';
import { RoleType } from '../../common/constants';
import { RolesGuard } from '../../guards/roles.guard';
import { UserAddDto } from './dto/UserAddDto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiOkResponse({ type: UserDto, description: 'Successfully Registered' })
  @ApiBadRequestResponse({ description: 'Email already exists' })
  public async createTodo(@Body() createUser: UserRegisterDto) {
    return await this.authService.create(createUser);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: LoginPayloadDto,
    description: 'User info with access token',
  })
  async userLogin(
    @Body() userLoginDto: UserLoginDto,
  ): Promise<LoginPayloadDto> {
    const userEntity: User = await this.authService.validateUser(
      userLoginDto,
    );
    const token = await this.authService.createToken(userEntity);
    return new LoginPayloadDto(userEntity, token);
  }

  @Post('reset-password')
  @ApiOkResponse({
    type: ResetPasswordDto,
    description: 'Reset password for user',
  })
  public async resetPassword(@Body('email') email: string) {
    return await this.authService.resetPassword(email);
  }

  @Post('reset-password/verify')
  @ApiOkResponse({
    type: ResetPasswordDto,
    description: 'Reset password for user',
  })
  public async resetPasswordVerify(@Body() data: ConfirmPasswordDto) {
    return await this.authService.resetPasswordVerify(data);
  }

  @Post('change-password')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({
    type: ChangePasswordDto,
    description: 'Change password for user',
  })
  public async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @AuthUser() user: User,
  ) {
    return await this.authService.changePassword(user, changePasswordDto);
  }

  /**
   * Admin actions
   */

  @Get('users/:userId/impersonate')
  @Roles(RoleType.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: String, description: 'Token for current user' })
  async addNewUser(
    @Param("userId") id: number
  ): Promise<User> {
    return await this.authService.impersonate(id)
  }
}
