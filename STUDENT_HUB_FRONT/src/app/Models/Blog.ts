import { Image } from "./Image";

export class Blog {
  _id: any;
  titre: String;
  description: String;
  image: string;
  user: any;
  date: Date = new Date;
  like: number;
  commentaires: any[];
  nombreCommentaire: number;

  constructor() { }
}
