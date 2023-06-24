import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId } from "class-validator";

export class StreamerIdParam {
    @ApiProperty({ type: String })
    @IsMongoId()
    streamerId: string
}