type TicketData = {
    _id: string;
    name: string;
    lane?: string; // Id to the string
    description?: string;
    status?: string;
}

/*
 * The ticket class. Represents a single task in the board.
 * Modeled to be a mirror of the data in the database.
 */
export default class Ticket implements TicketData {
    public _id: string;
    public name: string;
    public lane?: string;
    public description?: string;
    public status?: string;

    constructor(_id: string, name: string, lane?: string, description?: string, status?: string) {
        this._id = _id;
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

    setLane(laneId: string) {
        this.lane = laneId;
    }
}