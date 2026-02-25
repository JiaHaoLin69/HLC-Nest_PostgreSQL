import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, Post, Put } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import { Usuario } from "./entities/usuario.entity";
import { CreateUsuarioDto } from "./dto/create-usuario.dto";

@Controller("usuario")
export class UsuarioController {
  constructor(private readonly usuariosService: UsuarioService) {}

  @Post()
  async create(@Body() usuarioDto: CreateUsuarioDto): Promise<Usuario> {
    return this.usuariosService.create(usuarioDto);
  }

  @Get()
  async findAll(): Promise<Usuario[]> {
    return this.usuariosService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Usuario> {
      return await this.usuariosService.findOne(+id);
  }

  @Put(":id")
  async update(@Param('id') id: string, @Body() usuarioDto: CreateUsuarioDto): Promise<Usuario> {
      return await this.usuariosService.update(+id, usuarioDto)
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
      await this.usuariosService.remove(+id);
  }

  @Get('email/:email')
  async findByEmail(@Param('email') email: string): Promise<Usuario> {
    const usuario = await this.usuariosService.findByEmail(email);
    if (!usuario) {
      throw new NotFoundException(`Usuario con email ${email} no encontrado`);
    }
    return usuario;
  }

  @Put(':id/activate')
  async activateUser(@Param('id') id: string): Promise<Usuario> {
      return await this.usuariosService.activateUser(+id);
  }

  @Put(':id/deactivate')
  async deactivateUser(@Param('id') id: string): Promise<Usuario> {
      return await this.usuariosService.deactivateUser(+id);
}
}