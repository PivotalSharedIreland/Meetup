export class Meetup {
    constructor(public id:string,
                public name:string,
                public description:string,
                public time:string) {
    }

    static fromJSON(json: string) {
        return this.fromObject(JSON.parse(json));
    }

    static fromObject(obj) {
        return new Meetup(obj.id, obj.name, obj.description, obj.time);
    }

    public toString() {
        return this.name;
    }
}