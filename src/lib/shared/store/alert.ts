import {writable} from "svelte/store";

type alertType = 'success' | 'error' | 'warning' | 'info';

export type Alert =  {
    id?: number;
    title: string;
    content: string;
    type: alertType;
    duration?: number;
}

const alerts = writable<Alert[]>([]);


export const makeAlert = (alert: Alert) => {



    const newAlert: Alert = {
        ...alert
    }

    alerts.update((data) => {
        newAlert.id = data.length + 1;
        return [newAlert, ...data]
    })
}

export const removeAlert = (id: number) => {
    alerts.update((data) => {
        return data.filter((alert) => alert.id !== id)
    })
}

export default alerts;