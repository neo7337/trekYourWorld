import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class TreksInformation {
  @Prop()
  org: string;

  @Prop()
  treks: Trek[];
}

class Trek {
  uuid: string;
  title: string;
  uid: string;
  url: string;
  elevation: string;
  duration: string;
  cost: string;
  difficulty: string;
  location: string;
  bestTimeToTarget: string[];
  tags: string[];
}
