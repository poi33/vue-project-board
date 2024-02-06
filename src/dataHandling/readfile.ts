import json from '@/data/data.json';
import Ticket from '@/dataHandling/Ticket';
import Lane from '@/dataHandling/Lane';

export function getJsonData() {
    // Should change this to fetch data from database.
    // GraphQL? SQL?
    // For now, we will use a json file.

    if (json.tickets && json.lanes) {
        const tickets = new Map<number, Ticket>();
        json.tickets.forEach((el: any) => {
                tickets.set(el.id, new Ticket(
                    el.id,
                    el.name,
                    el.lane,
                    el.description,
                    el.status));
        });

        const lanes = new Map<number, Lane>();
        json.lanes.forEach((el: any) => {
            if (el.isDefault) {
                Lane.setDefaultLane(new Lane(el.id, el.name));
            }
            lanes.set(el.id, new Lane(el.id, el.name));
        });

        return { tickets, lanes };
    }

    console.error("No data found");
    return null;
}