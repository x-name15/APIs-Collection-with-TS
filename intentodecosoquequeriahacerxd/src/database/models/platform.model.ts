import { model, Document } from "mongoose";
import platformSchema from "../schemas/platform.schema";
import { IPlatform } from "../../structures/interfaces/platform.interface";

interface IPlatformDocument extends IPlatform, Document {}
const platform = model<IPlatformDocument>("Platform", platformSchema);
export default platform;
