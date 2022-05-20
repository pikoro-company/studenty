export class Commentaire {
  id: number;
  description: String;
  like: number;
  date: Date = new Date;
  masquer: Boolean;
  blog: any;
  user: any;
  reponse: any;

  constructor() { }
}
