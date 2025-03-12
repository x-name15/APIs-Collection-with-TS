import { model, Document } from "mongoose";
import releaseYearSchema from "../schemas/releaseyear.schema";
import { IReleaseYear } from "../../structures/interfaces/releaseyear.interface";

interface IReleaseYearDocument extends IReleaseYear, Document {}
const releaseYear = model<IReleaseYearDocument>("ReleaseYear", releaseYearSchema);
export default releaseYear;
// Compare this snippet from src/database/models/developer.model.ts: