import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class CreateOnlineUserDto {

    @IsNotEmpty({message: 'el campo userId es obligatorio'})
    @MinLength(4, {message: 'el campo userId debe ser mínimo de 4 caracteres'})
    @MaxLength(60, {message: 'el campo userId debe ser maximo de 60 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo userId contiene caracteres inválidos, solo se permite letras y números'})
    readonly userId: string;

    @IsNotEmpty({message: 'el campo nick es obligatorio'})
    @MinLength(4, {message: 'el campo nick debe ser mínimo de 4 caracteres'})
    @MaxLength(8, {message: 'el campo nick debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo nick contiene caracteres inválidos, solo se permite letras y números'})
    readonly nick: string;

    @IsNotEmpty({message: 'el campo connectionId es obligatorio'})
    @MinLength(4, {message: 'el campo connectionId debe ser mínimo de 4 caracteres'})
    @MaxLength(60, {message: 'el campo connectionId debe ser maximo de 60 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo connectionId contiene caracteres inválidos, solo se permite letras y números'})
    readonly connectionId: string;
}
