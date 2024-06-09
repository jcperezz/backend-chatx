import { IsAlphanumeric, IsMongoId, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateMessageDto {

    @IsNotEmpty({message: 'el campo content es obligatorio'})
    @MinLength(1, {message: 'el campo content debe ser mínimo de ($min) caracteres'})
    @MaxLength(64, {message: 'el campo content debe ser maximo de ($max) caracteres'})
    @IsString({message: 'el campo content no es un string válido'})
    readonly content: string;

    @IsNotEmpty({message: 'el campo senderId es obligatorio'})
    @MinLength(4, {message: 'el campo senderId debe ser mínimo de 4 caracteres'})
    @MaxLength(20, {message: 'el campo senderId debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo senderId contiene caracteres inválidos, solo se permite letras y números'})
    readonly senderId: string;

    @IsNotEmpty({message: 'el campo nick es obligatorio'})
    @MinLength(4, {message: 'el campo nick debe ser mínimo de 4 caracteres'})
    @MaxLength(8, {message: 'el campo nick debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo nick contiene caracteres inválidos, solo se permite letras y números'})
    readonly nick: string;
}