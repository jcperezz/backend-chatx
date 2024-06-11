import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class NewMessageDto {

    @ApiProperty()
    readonly id: string;

    @ApiProperty()
    readonly content: string;
    
    @ApiProperty()
    readonly date: number;

    @ApiProperty()
    readonly fromId: string;

    @ApiProperty()
    readonly toId: string;

    @ApiProperty()
    readonly toConnectionId: string;

    @ApiProperty()
    readonly nick: string;

}