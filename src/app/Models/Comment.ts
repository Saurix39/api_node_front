export class Comment{
    constructor(
        public _id:string,
        public content:string,
        public date:Date,
        public user:any
    ){}
}