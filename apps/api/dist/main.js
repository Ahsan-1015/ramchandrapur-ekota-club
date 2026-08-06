"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cookieParser = require("cookie-parser");
const helmet_1 = require("helmet");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api/v1');
    app.use((0, helmet_1.default)());
    app.use(cookieParser());
    app.enableCors({
        origin: process.env.CLIENT_URL || 'http://localhost:3000',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Ramchandrapur Ekota Club API')
        .setDescription('Enterprise-grade API documentation for Ramchandrapur Ekota Club Management System')
        .setVersion('1.0')
        .addBearerAuth()
        .addTag('Authentication')
        .addTag('Members')
        .addTag('Committee')
        .addTag('Events')
        .addTag('Finance')
        .addTag('Notices')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT || 5000;
    await app.listen(port);
    console.log(`🚀 Ramchandrapur Ekota Club API running on http://localhost:${port}/api/v1`);
    console.log(`📚 Swagger Docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map