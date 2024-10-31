export type referralDataType = {
    age: number;
    agent_code: string | null;
    creation_time: string;
    device_id: string | null;
    email: string;
    full_name: string | null;
    gender: "None" | "Male" | "Female";
    id: number;
    image: string | null;
    institution: string | null;
    is_active: boolean;
    is_admin: boolean;
    is_agent: boolean;
    is_superuser: boolean;
    is_verified: boolean;
    last_login: string | null;
    last_updated_time: string;
    otp_code: number;
    password: string;
    phone_number: string;
    phone_otp_registration: boolean;
    referral_code: string;
    region: { id: number, name: string } | null;
    total_purchases: number;
};

export type earningType = {
    id: string;
    creation_time: Date;
    commision_total: number;
    owner: {
        id: string;
        phone_number: string;
        region: { id: number, name: string } | null;
    },
    product: {
        id: string;
        title: string;
        product_type: {
            id: string;
            name: string
        }
    }
}

export type payoutsType = {
    id: string;
    creation_time: Date;
    total: number;
    agent_current_balance: number;
}

export type User = {
    id: number;
    password: string;
    last_login: string;
    image: string;
    email: string;
    full_name: string;
    phone_number: string;
    device_id: string;
    gender: "None" | "Male" | "Female";
    age: number;
    otp_code: number;
    phone_otp_registration: boolean;
    is_admin: boolean;
    is_superuser: boolean;
    is_active: boolean;
    is_verified: boolean;
    is_agent: boolean;
    agent_code: string;
    institution: string;
    referral_code: string;
    creation_time: string;
    last_updated_time: string;
    region: {
        id: number;
        name: string;
    };
}

