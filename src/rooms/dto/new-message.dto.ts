import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class NewMessageDto {

    readonly id: string;

    readonly content: string;
    
    readonly date: number;

    readonly fromId: string;

    readonly toId: string;

    readonly toConnectionId: string;

    readonly nick: string;

}