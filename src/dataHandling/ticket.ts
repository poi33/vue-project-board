export type Swimlane = {
    id: number,
    name: string,
}

export type TicketData = {
    id: number;
    name: string;
    lane: id;
    description?: string;
    status?: string;
}

export function getLane(lanes: Swimlane[], laneid: number): Swimlane {
    return lanes.find(lane => lane.id === laneid);
}

export class Ticket implements TicketData {
    public id: number;
    public name: string;
    public lane: number;
    public description?: string;
    public status?: string;

    constructor(id: number, name: string, lane: number, description?: string, status?: string) {
        this.id = id;
        this.name = name;
        this.lane = lane;
        this.description = description;
        this.status = status;
    }

    setStatus(status: string) {
        this.status = status;
    }

    setDescription(description: string) {
        this.description = description;
    }

    setName(name: string) {
        this.name = name;
    }

    setLane(number: number) {
        this.lane = number;
    }
}