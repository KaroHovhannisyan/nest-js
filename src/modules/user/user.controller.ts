import {
  Controller,
  HttpStatus,
  HttpCode,
  Body,
  Post,
  UseGuards,
  Get,
  Patch,
  Delete,
  UploadedFile,
  UseInterceptors,
  Param,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserDto } from './dto/UserDto';
import { User } from '../../models/User';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../../guards/auth.guard';
import { ChangePasswordDto } from '../auth/dto/ChangePasswordDto';
import { AuthUser } from '../../decorators/auth-user.decorator';
import { ApiImplicitFile } from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import { IFile } from '../../interfaces/IFile';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserUpdateDto } from './dto/UserUpdateDto';
import { extname } from  'path';
import { diskStorage } from  'multer';

export const imageFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  callback(null, true);
};

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UserDto, description: 'Current user info' })
  getCurrentUser(@AuthUser() user: User) {
    return user.getPublicFields();
  }

  @Patch('')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: ChangePasswordDto, description: 'Change user info' })
  public async updateInfo(@Body() updateAbleData: any, @AuthUser() user: User) {
    return await this.userService.changeUserProfile(user, updateAbleData);
  }

  // @Post('upload-image')
  //   // @UseGuards(JwtAuthGuard)
  //   // @ApiBearerAuth()
  //   // @ApiImplicitFile({ name: 'avatar', required: true })
  //   // @UseInterceptors(FileInterceptor('avatar'))
  //   // @ApiOkResponse({ type: String, description: 'Uploaded image url' })
  //   // public async uploadImage(
  //   //   @UploadedFile() file: IFile,
  //   //   @AuthUser() user: User,
  //   // ) {
  //   //   return await this.userService.uploadImage(user, file);
  //   // }

  @Post('upload-image')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiImplicitFile({ name: 'avatar', required: true })
  @UseInterceptors(FileInterceptor('avatar',
    {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
    )
  )
  @ApiOkResponse({ type: String, description: 'Uploaded image url' })
  public async uploadAvatar(
    @UploadedFile() file,
    @AuthUser() user: User
  ) {
    return await this.userService.uploadImage(user, file);
  }

  /**
   *
   */

  // @Get('avatars/:fileId')
  // @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth()
  // async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
  //   res.sendFile(fileId, { root: 'avatars'});
  // }
}
