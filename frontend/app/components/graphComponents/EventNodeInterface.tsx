import { Node } from "reactflow";
import { Event } from "../eventComponents/event-interface";

export interface EventNode extends Node {
  data: Event;
}
