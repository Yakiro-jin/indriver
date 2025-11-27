import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WebsocketModule } from './websocket/websocket.module';
import { RutasModule } from './rutas/rutas.module';
import { CoperativaModule } from './coperativa/coperativa.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'trasporte',
    password : '1',
    database : 'trasporte_db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize : false
  }),
    WebsocketModule,
    RutasModule,
    CoperativaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
