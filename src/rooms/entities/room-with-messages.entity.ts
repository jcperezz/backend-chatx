import { PartialType } from "@nestjs/mapped-types";
import { Room } from "./room.entity";
import { Message } from "./message.entity";

export class RoomWithMessages extends PartialType(Room) {

    readonly messages?: Message[];
}