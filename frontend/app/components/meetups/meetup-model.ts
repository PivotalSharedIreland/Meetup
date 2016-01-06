export class Meetup {
    constructor(public id:string,
                public name:string,
                public description:string,
                public urlName:string,
                public time:Date) {
    }

    static fromJSON(json: string) {
        return this.fromObject(JSON.parse(json));
    }

    static fromObject(obj) {
        return new Meetup(obj.id, obj.name, obj.description, obj.urlName, new Date(obj.time));
    }

    public toString() {
        return this.name;
    }
}