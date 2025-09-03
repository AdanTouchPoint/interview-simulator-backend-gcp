export type User = {
    id: string;
    name: string;
    lastName: string;
    city: string;
    roles: string;
}

export type Media = {
    id: string;
    user: string | User;
    name: string;
    type: string;
    gcKey: string;
    status: string;
}

export type Sessions = {
    name: string;
    lastName: string;
    city: string;
    roles: string;
}

export type PayloadType = {
    name: string;
    lastName: string;
    city: string;
    roles: string;
}

export type Payload = {
    name: string;
    lastName: string;
    city: string;
    roles: string;
}
