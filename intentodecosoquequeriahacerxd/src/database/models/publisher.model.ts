import { model, Document } from "mongoose";
import publisherSchema from "../schemas/publisher.schema";
import { IPublisher } from "../../structures/interfaces/publisher.interface"; 

interface IPublisherDocument extends IPublisher, Document {}
const publisher = model<IPublisherDocument>("Publisher", publisherSchema);
export default publisher;
