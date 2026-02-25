import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}
  async create(usuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = this.usuarioRepository.create(usuarioDto);
    return this.usuarioRepository.save(usuario);
  }
  async findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }
  async findOne(id: number): Promise<Usuario> {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    return usuario;
  }
  async update(id: number, usuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const usuario = await this.findOne(id);
    this.usuarioRepository.merge(usuario, usuarioDto);
    return this.usuarioRepository.save(usuario);
  }
  async remove(id: number): Promise<void> {
    const usuario = await this.findOne(id);
    await this.usuarioRepository.remove(usuario);
  }
  async findByEmail(email: string): Promise<Usuario | null> {
    return this.usuarioRepository.findOne({ where: { email } });
  }
  async activateUser(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.activo = true;
    return this.usuarioRepository.save(usuario);
  }
  async deactivateUser(id: number): Promise<Usuario> {
    const usuario = await this.findOne(id);
    usuario.activo = false;
    return this.usuarioRepository.save(usuario);
  }
}