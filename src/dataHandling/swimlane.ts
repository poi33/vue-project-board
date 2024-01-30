export type Swimlane = {
    id: number;
    name: string;
    items?: number[];
}

export type Item = {
    id: number;
    name: string;
    description?: string;
    status?: string;
}

export enum directions {
    left,
    right
}

export type Direction = directions.left | directions.right;

/**
 * Checks if a ticket can be moved on the current lane is possible to avoid a
*  ticket moving causing errors.
 */
export function canMoveLane(allLanes: Swimlane[], fromLane: Swimlane, direction: Direction) {
    if (direction === directions.left) {
        const index = allLanes.indexOf(fromLane);
        if (index !== 0 &&
            index > -1) {
            return true;
        }
        return false;
    }
    else {
        const index = allLanes.indexOf(fromLane);
        if (index !== allLanes.length - 1 &&
            index > -1) {
            return true;
        }
        return false;
    }
}

/**
 * Easy-of-use method for getting a swimlane.
 */
export function getSwimlane(allLanes: Swimlane[], currentId: number): Swimlane | null;

export function getSwimlane(allLanes: Swimlane[], currentSwimlane: Swimlane): Swimlane | null;

export function getSwimlane(allLanes: Swimlane[], currentSwimlane: Swimlane | number) {
    if (typeof currentSwimlane === "number") {
        const lane = allLanes.find(lane => lane.id == currentSwimlane);

        return lane ? lane : null;
    } else {
        const index = allLanes.indexOf(currentSwimlane);

        return allLanes[index] ? allLanes[index] : null;
    }
}

export function getLaneByDirection(
    allLanes: Swimlane[],
    currentSwimlane: Swimlane,
    direction: Direction): Swimlane {

    const index = allLanes.indexOf(currentSwimlane);

    if (direction === directions.left) {

        return allLanes[index - 1];
    }
    else {

        return allLanes[index + 1];
    }
}

/**
 * Checks if a ticket is in a lane, to avoid moving not existing tickets.
 */
export function isTicketInLane(currentTicketId: number, currentSwimlane: Swimlane): boolean {
    if (!currentSwimlane.items) {
        return false;
    }

    return currentSwimlane.items?.indexOf(currentTicketId) >= 0 ? true : false;
}

/**
 * Easy-of-use method for getting a ticket.
 */
export function getTicket(allTickets: Item[], currentId: number): Item | null {
    const ticket = allTickets.find(ticket => ticket.id == currentId);

    return ticket ? ticket : null;
}

export function removeFromLane(
    currentItemId: number,
    currentSwimlane: Swimlane): Number | null {
    const refCurrentItem = currentSwimlane?.items?.find(el => el === currentItemId);

    if (currentSwimlane?.items && refCurrentItem) {
        const removedElements = currentSwimlane.items.splice(
            currentSwimlane.items.indexOf(refCurrentItem),
            1
        );

        if (removedElements.length > 1) {
            console.error("More than one element removed!");
        }

        if (removedElements[0] !== currentItemId) {
            console.error("Removed element id does not match current item id");
        }

        return removedElements[0];
    }

    return null;
}

export function addToLane(
    currentItemId: number,
    laneToAdd: Swimlane): void {

    if (laneToAdd.items) {
        laneToAdd.items.push(currentItemId);
    } else {
        laneToAdd.items = [currentItemId];
    }
}

export function moveTicket(
    allLanes: Swimlane[],
    allTickets: Item[],
    currentTicketId: number,
    currentSwimlaneId: number,
    direction: Direction) {

    const currentSwimlane = getSwimlane(allLanes, currentSwimlaneId);
    if (!currentSwimlane) {
        console.error("Swimlane not found!");

        return null;
    }
    if (!canMoveLane(allLanes, currentSwimlane, direction)) {
        console.error("Ticket cannot move!");

        return null;
    }
    if (!isTicketInLane(currentTicketId, currentSwimlane)) {
        console.error("Ticket is not in lane!");

        return null;
    }
    const currentTicket = getTicket(allTickets, currentTicketId);
    if (!currentTicket) {
        console.error("Ticket not found!");

        return null;
    }

    const nextLane = getLaneByDirection(allLanes, currentSwimlane, direction);
    removeFromLane(currentTicketId, currentSwimlane);
    addToLane(currentTicketId, nextLane);
}