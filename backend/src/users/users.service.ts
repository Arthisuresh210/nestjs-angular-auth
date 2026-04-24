/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.repo.findOne({ where: { email } });
  }

  async findById(id: number): Promise<User | null> {
    console.log('Finding user by id:', id);
    const user = await this.repo.findOne({ where: { id: Number(id) } });
    console.log('Found user:', user);
    return user;
  }

  async findOrCreateGoogleUser(profile: any): Promise<User> {
    let user = await this.repo.findOne({ where: { google_id: profile.id } });
    if (!user) {
      user = this.repo.create({
        google_id: profile.id,
        email: profile.emails[0].value,
        name: profile.displayName,
        picture: profile.photos?.[0]?.value,
      });
      await this.repo.save(user);
    }
    return user;
  }

  async createLocalUser(
    email: string,
    password: string,
    name: string,
  ): Promise<User> {
    const hashed = await bcrypt.hash(password, 10);
    const user = this.repo.create({ email, password: hashed, name });
    return this.repo.save(user);
  }

  async validatePassword(plain: string, hashed: string): Promise<boolean> {
    return bcrypt.compare(plain, hashed);
  }
}
