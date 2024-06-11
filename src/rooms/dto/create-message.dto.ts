import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {

    @ApiProperty()
    @IsNotEmpty({message: 'el campo content es obligatorio'})
    @MinLength(1, {message: 'el campo content debe ser mínimo de ($min) caracteres'})
    @MaxLength(64, {message: 'el campo content debe ser maximo de ($max) caracteres'})
    @IsString({message: 'el campo content no es un string válido'})
    readonly content: string;

    @ApiProperty()
    @IsNotEmpty({message: 'el campo fromId es obligatorio'})
    @MinLength(4, {message: 'el campo fromId debe ser mínimo de 4 caracteres'})
    @MaxLength(20, {message: 'el campo fromId debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo fromId contiene caracteres inválidos, solo se permite letras y números'})
    readonly fromId: string;

    @ApiProperty()
    @IsNotEmpty({message: 'el campo toId es obligatorio'})
    @MinLength(4, {message: 'el campo toId debe ser mínimo de 4 caracteres'})
    @MaxLength(20, {message: 'el campo toId debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo toId contiene caracteres inválidos, solo se permite letras y números'})
    readonly toId: string;

    @ApiProperty()
    @IsNotEmpty({message: 'el campo nick es obligatorio'})
    @MinLength(4, {message: 'el campo nick debe ser mínimo de 4 caracteres'})
    @MaxLength(8, {message: 'el campo nick debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo nick contiene caracteres inválidos, solo se permite letras y números'})
    readonly nick: string;
}
