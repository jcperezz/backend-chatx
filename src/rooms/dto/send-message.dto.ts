import { PartialType } from "@nestjs/mapped-types";
import { CreateMessageDto } from "./create-message.dto";

export class SendMessageDto extends PartialType(CreateMessageDto)  {

    readonly roomId: string;
}