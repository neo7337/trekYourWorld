import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrgsModule } from './orgs/orgs.module';

@Module({
  imports: [MongooseModule.forRoot(''), OrgsModule],
})
export class AppModule {}
