export interface Profile {
    id: string;
    username: string
    full_name: string;
    avatar_url: string;
}

export interface Design {
    id: number;
    creator: string;
    name: string;
    created_at: string;
    image: string;
    text_style: JSON[];
}

export interface TextSet {
    id: number;
    text: string;
    fontFamily: string;
    top: number;
    left: number;
    color: string;
    fontSize: number;
    fontWeight: number;
    opacity: number;
    shadowColor: string;
    shadowSize: number;
    rotation: number;
}