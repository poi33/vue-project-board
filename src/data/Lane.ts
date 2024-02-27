type LaneData = {
    _id: string,
    name: string,
    color?: string,
    isDefault?: boolean,
}

export default class Lane implements LaneData {
    public _id: string;
    public name: string;
    public isDefault?: boolean;
    public color?: string;
    private static defaultLane: Lane;

    constructor(_id: string, name: string, color?: string) {
        this._id = _id;
        this.name = name;
        this.color = color;
    }

    setName(name: string) {
        this.name = name;
    }

    /*
     * Gets the lane based on id. Fallback to the default lane.
     */
    getLane(): Lane {
        return this;
    }

    setColor(color: string) {
        this.color = color;
    }

    /*
     * Sets the default lane.
     */
    static setDefaultLane(lane: Lane) {
        if (Lane.defaultLane === undefined) {
            Lane.defaultLane = lane;
        }
    }
    
    static getDefaultLane(): Lane {
        return Lane.defaultLane;
    }
}