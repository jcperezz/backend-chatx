import { IsAlphanumeric, IsNotEmpty, MaxLength, MinLength } from "class-validator";


export class SendOnlineUser  {

    @IsNotEmpty({message: 'el campo id es obligatorio'})
    readonly id: string;
    
    @IsNotEmpty({message: 'el campo nick es obligatorio'})
    @MinLength(4, {message: 'el campo nick debe ser mínimo de 4 caracteres'})
    @MaxLength(8, {message: 'el campo nick debe ser maximo de 8 caracteres'})
    @IsAlphanumeric("es-ES", {message: 'el campo nick contiene caracteres inválidos, solo se permite letras y números'})
    readonly nick: string;
}