import { model, Document } from "mongoose";
import gameSchema from "../schemas/game.schema";
import { IGame } from "../../structures/interfaces/game.interface";

interface IGameDocument extends IGame, Document {}

const game = model<IGameDocument>("Game", gameSchema);
export default game;
// The game.model.ts file defines the Mongoose model for the game resource. It imports the model and Document types from the mongoose module, the gameSchema from the game.schema.ts file, and the IGame interface from the game.interface.ts file. It defines an IGameDocument interface that extends the IGame interface and the Document interface from Mongoose. Finally, it exports the game model created with the model function from Mongoose, passing the IGameDocument interface and the gameSchema as arguments.
