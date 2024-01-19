import { Module, forwardRef } from '@nestjs/common';
import { AuthController } from './Controller/auth.contorller';
import { AuthService } from './Services/auth.service';
import { UserModule } from '../User/user.module';

@Module({
  imports: [forwardRef(() => UserModule),],
  controllers: [AuthController ],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
