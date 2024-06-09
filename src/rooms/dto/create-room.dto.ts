import { IsAlphanumeric, IsMongoId, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {

    @IsNotEmpty({ message: 'el campo name es obligatorio' })
    @MinLength(4, { message: 'el campo name debe ser mínimo de 4 caracteres' })
    @MaxLength(32, { message: 'el campo name debe ser maximo de 32 caracteres' })
    @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'el campo name contiene caracteres inválidos, solo se permite letras y números' })
    readonly name: string;


    @IsNotEmpty({ message: 'el campo adminId es obligatorio' })
    @MinLength(4, { message: 'el campo adminId debe ser mínimo de 4 caracteres' })
    @MaxLength(20, { message: 'el campo adminId debe ser maximo de 20 caracteres' })
    @IsAlphanumeric("es-ES", { message: 'el campo adminId contiene caracteres inválidos, solo se permite letras y números' })
    readonly adminId: string;
}
