import { ApiProperty } from "@nestjs/swagger";
import { IsEnum } from "class-validator";
import { VoteType } from "../../../types/streamers/vote-type";

export class StreamerVoteDTO {
    @ApiProperty({ type: String, enum: VoteType })
    @IsEnum(VoteType)
    vote: VoteType
}