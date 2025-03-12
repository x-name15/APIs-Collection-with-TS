import { model, Document } from "mongoose";
import developerSchema from "../schemas/developer.schema";
import { IDeveloper } from "../../structures/interfaces/developer.interface";

interface IDeveloperDocument extends IDeveloper, Document {}
const developer = model<IDeveloperDocument>("developer", developerSchema);
export default developer;