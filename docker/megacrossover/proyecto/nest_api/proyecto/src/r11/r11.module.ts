import { Module } from '@nestjs/common';
import { ProfileModule } from './profile/profile.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [ProfileModule, UserModule]
})
export class R11Module {}
