import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({ collection: 'users' })
export class User extends Document {
    @Prop()
    username: string;
    
    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    completedTreks: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('timestamps', true);