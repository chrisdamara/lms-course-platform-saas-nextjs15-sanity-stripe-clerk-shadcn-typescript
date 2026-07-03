export interface Slug {
    _type: string;
    current: string;
}

export interface Course {
    _id: string;
    _type: string;
    instructor: null | string;
    price: number;
    slug: Slug;
    title: string;
    description?: string;
    image?: string | null | undefined;
}