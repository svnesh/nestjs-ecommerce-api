import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UserModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.getOrThrow<string>('JWT_TOKEN_EXPIRY_DURATION'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService, 
    AuthResolver, 
    LocalStrategy, 
    JwtStrategy, 
    {
      provide: 'JWT_REFRESH',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return new JwtService({
          secret: configService.get<string>('JWT_REFRESH_SECRET'),
          signOptions: {
            expiresIn: configService.getOrThrow<string>('JWT_REFRESH_TOKEN_EXPIRY_DURATION'),
          },
        })
      }
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
