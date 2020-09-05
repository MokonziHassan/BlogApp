export class Post{
    constructor(
        public title: string,
        public content: string,
        public lovesIt ?: number,
        public createdAt ?: Date
    ){

    }
}