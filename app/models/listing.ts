export interface Listing {
    listing_id: string;
    category: string;
    location: {
        value: string;
        label: string;
        flag: string;
        latlng: [number, number];
        region: string;
    };
    image_src: string;
    guest_count: number;
    room_count: number;
    bathroom_count: number;
    price: string;
    title: string;
    description: string;
    user_id: string;
    created_at: string;
}