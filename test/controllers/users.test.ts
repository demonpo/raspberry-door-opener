import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';
import { useDataSource, useSeeders } from '@jorgebodega/typeorm-seeding';
import { UsersCreate } from '../../src/database/seeds/1651763625266-UsersCreate';
import AppDataSource from '../../src/database/datasource';

describe('UsersController', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    const datasource = await AppDataSource.initialize();

    // Config to set up Database connection and to initialize migrations and seeders
    await datasource.dropDatabase();
    await datasource.runMigrations();
    await useDataSource(datasource);

    await useSeeders(UsersCreate);
  });

  it('/users (GET)', async () => {
    expect(true).toBe(true);
  });
});
