import { IsEnum, IsString } from "class-validator";
import { StreamingPlatform } from "../../../types/streamers/streaming-platform";
import { ApiProperty } from "@nestjs/swagger";

export class CreateStreamerDTO {
    @ApiProperty({ type: String })
    @IsString()
    name: string

    @ApiProperty({ type: String })
    @IsString()
    description: string

    @ApiProperty({ type: String, enum: StreamingPlatform })
    @IsEnum(StreamingPlatform)
    platform: StreamingPlatform
}