import Ticket from '@/data/Ticket';
import Lane from '@/data/Lane';

export async function getData() {
    const response = await fetch('/api',
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

    if (!response.ok) {
        console.log(response.status, response.statusText);
        throw new Error(`Could not fetch data. Status: ${response.status} ${response.statusText}`);
    }
    
    const json = await response.json();

    const data = json;

    if (data.tickets && data.lanes) {
        const tickets = new Map<String, Ticket>();
        data.tickets.forEach((el: any) => {
            tickets.set(el._id, new Ticket(
                el._id,
                el.name,
                el.lane,
                el.description,
                el.status));
        });

        const lanes = new Map<String, Lane>();
        data.lanes.forEach((el: any) => {
            if (el.isDefault) {
                Lane.setDefaultLane(
                    new Lane(el._id, el.name, el.color)
                );
            }
            lanes.set(el._id, new Lane(el.id, el.name, el.color));
        });

        return { tickets, lanes };
    }

    //TODO: handle no lanes and tickets. Just create them if they don't exist.
    console.log("Could not find tickets or lanes");
    throw new Error("No data found");
}