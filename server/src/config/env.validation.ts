import { plainToInstance } from 'class-transformer';
import { IsEnum, IsString, validateSync, IsNumber } from 'class-validator';

enum Environment {
  Development = 'development',
  Production = 'production',
}

class EnvironmentVariables {
  @IsNumber()
  APP_PORT: number;

  @IsEnum(Environment)
  NODE_ENV: Environment;

  @IsString()
  NEST_MONGO_URI: string;

  @IsString()
  MONGO_LOCAL_USER: string;

  @IsString()
  MONGO_LOCAL_PASSWORD: string;

  @IsString()
  MONGO_LOCAL_DATABASE: string;

  @IsString()
  MONGO_LOCAL_HOST: string;

  @IsString()
  MONGO_LOCAL_UI_USER: string;

  @IsString()
  MONGO_LOCAL_UI_PASSWORD: string;

  @IsString()
  IMAGEKIT_PUBLIC_KEY: string;

  @IsString()
  IMAGEKIT_PRIVATE_KEY: string;

  @IsString()
  IMAGEKIT_ENDPOINT: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
