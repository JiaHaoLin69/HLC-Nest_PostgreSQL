import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';
import { PinturaModule } from './pintura/pintura.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioModule } from './usuario/usuario.module';
import { LibreriaModule } from './libreria/libreria.module';
import { MensajesModule } from './mensajes/mensajes.module';
import { R11Module } from './r11/r11.module';
import { RnnModule } from './rnn/rnn.module';
import { PeliculasModule } from './peliculas/peliculas.module';
import { PokemonModule } from './pokemon/pokemon.module';



@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'public'),
    serveRoot: '',
    exclude: ['/api/(.*)'],
  }), PinturaModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'usuarios-postgres',
    port: 5432,
    username: 'postgres',
    password: 'usuario',
    database: 'nestasir',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true
  }), UsuarioModule, LibreriaModule, MensajesModule, R11Module, RnnModule, PeliculasModule, PokemonModule],
  controllers: [AppController, ProductsController],
  providers: [AppService, ProductsService],
})
export class AppModule { }
