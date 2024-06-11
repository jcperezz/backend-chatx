import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsAlphanumeric, IsMongoId, IsNotEmpty, Matches, MaxLength, MinLength } from "class-validator";

export class CreateRoomDto {

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo name es obligatorio' })
    @MinLength(4, { message: 'el campo name debe ser mínimo de 4 caracteres' })
    @MaxLength(32, { message: 'el campo name debe ser maximo de 32 caracteres' })
    @Matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/, { message: 'el campo name contiene caracteres inválidos, solo se permite letras y números' })
    readonly name: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'el campo participantsIds es obligatorio' })
    @ArrayNotEmpty({ message: 'debe tener participantes' })
    readonly participantsIds: string[];
}
