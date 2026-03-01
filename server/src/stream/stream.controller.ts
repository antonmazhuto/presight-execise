import { Controller, Get, HttpCode, Res } from '@nestjs/common';
import type { Response } from 'express';
import { faker } from '@faker-js/faker';

@Controller('stream')
export class StreamController {
  @Get()
  @HttpCode(200)
  public async streamText(@Res() res: Response) {
    res.setHeader('Content-Type', 'text/plain charset=utf-8');
    res.setHeader('Transfer-Encoding', 'chunked');

    const text = faker.lorem.paragraph(32);
    const chars = Array.from(text);

    for (const char of chars) {
      res.write(char);
      await new Promise((r) => setTimeout(r, 10));
    }

    res.end();
  }
}
