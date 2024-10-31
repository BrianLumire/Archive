export interface IUser {
  id: number;
  password: string;
  last_login: string;
  image: string | null;
  email: string;
  full_name: string | null;
  phone_number: string | null;
  device_id: string | null;
  gender: string;
  age: number;
  otp_code: number;
  phone_otp_registration: boolean;
  is_admin: boolean;
  is_superuser: boolean;
  is_active: boolean;
  is_verified: boolean;
  is_agent: boolean;
  agent_code: string | null;
  institution: string | null;
  referral_code: string | null;
  creation_time: string;
  last_updated_time: string;
  region: string | null;
}
export interface IProductType {
  id: number;
  name: string;
  creation_time: string;
  last_updated_time: string;
  categories: ICategory[];
  sub_categories: ISubCategory[];
}

export interface ICategory {
  id: number;
  name: string;
  creation_time: string;
  last_updated_time: string;
  sub_categories: ISubCategory[];
}

export interface ISubject {
  id: number;
  image: string;
  name: string;
  creation_time: string;
  last_updated_time: string;
}

export interface ISubCategory {
  id: number;
  video_product_count: number;
  exam_product_count: number;
  image: string | null;
  name: string;
  creation_time: string;
  last_updated_time: string;
  subjects: ISubject[];
}

export interface IProduct {
  id: number;
  has_purchased: boolean;
  purchases_number: number;
  title: string;
  price: number;
  author: string;
  thumbnail: string;
  media_file: string;
  answer_sheet: string | null;
  preview_video: string | null;
  video_length: number;
  exam_year: number;
  pages: number;
  description: string;
  creation_time: string;
  last_updated_time: string;
  product_type: IProductType;
  category: ICategory;
  sub_category: ISubCategory;
  subject: ISubject;
}
interface IPaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
export interface IProductsResponse extends IPaginatedResponse<IProduct> {}
export interface IProductQueryParams {
  search?: string;
  ordering?: string;
  product_type?: string;
  category?: string;
  sub_category?: string;
  subject?: string;
  id?: string;
  page?: number;
}

export interface IRegion {
  id: number;
  name: string;
  creation_time: string;
  last_updated_time: string;
}

export interface IAgent {
  id: number;
  total_referrals: number;
  commision_total: number;
  password: string;
  last_login: string | null;
  image: string | null;
  email: string;
  full_name: string;
  phone_number: string;
  device_id: string | null;
  gender: string;
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
  referral_code: string | null;
  creation_time: string;
  last_updated_time: string;
  region: IRegion;
}

export interface IAgentResponse extends IPaginatedResponse<IAgent> {}

export interface IAgentEarnings extends IAgent {
  disbursed_commission: number;
  current_balance: number;
  referree_purchases: number;
}
export interface IAgentEarningsResponse
  extends IPaginatedResponse<IAgentEarnings> {}
export interface IAgentStatistics {
  agents_total: number;
  regions_total: number;
  total_referrals: number;
}
export interface IUserResponse extends IPaginatedResponse<IUser> {}

export interface ICustomerStatistics {
  customers_number: number;
  occupied_regions: number;
  purchased_products: number;
}
export interface IFinancesStatistics {
  purchases_revenue: number;
  commission_total: number;
  paid_to_agents_total: number;
  pending_disbursements: number;
}
interface IRevenueDistribution {
  platform_revenue: number;
  paid_to_agents_total: number;
  pending_disbursements: number;
}

interface IRevenueByMediaType {
  books_total_revenue: number;
  videos_total_revenue: number;
  exams_total_revenue: number;
}

export interface IDashboardStats {
  total_customers: number;
  customers_today: number;
  total_agents: number;
  agents_today: number;
  cumulative_revenue: number;
  revenue_distribution: {
    platform_revenue: number;
    paid_to_agents_total: number;
    pending_disbursements: number;
  };
  revenue_by_media_type: {
    books_total_revenue: number;
    videos_total_revenue: number;
    exams_total_revenue: number;
  };
  top_statistics: {
    top_regions: {
      region__name: string | null;
      user_count: number;
    }[];
    top_products: {
      title: string;
      payment_count: number;
    }[];
    top_agents: {
      agent_name: string;
      sales_count: number;
    }[];
  };
}

export interface IProductStats {
  video_count: number;
  books_count: number;
  exams_count: number;
}

export interface IExtendedUserAgent extends IUser {
  total_purchases: number;
}
export interface IExtendedUserAgentResponse
  extends IPaginatedResponse<IExtendedUserAgent> {}
export interface ICustomer extends IUser {
  total_purchases: number;
  referral_agent: IAgent;
  amount_spent: number;
}
export interface ICustomerResponse extends IPaginatedResponse<ICustomer> {}

export interface IAgentCommission {
  id: number;
  commision_total: number;
  transaction_reference: string;
  status: string;
  has_paid_agent: boolean;
  purpose: string;
  is_bulk_payment: boolean;
  agent_current_balance: number;
  channel: string;
  currency: string;
  ip_address: string;
  total: number;
  has_confirmed: boolean;
  creation_time: string;
  last_updated_time: string;
  product: IProduct;
  owner: IUser;
}
export interface IAgentCommissionsResponse
  extends IPaginatedResponse<IAgentCommission> {}
export interface ISalesIncome {
  id: number;
  transaction_reference: string;
  status: string;
  has_paid_agent: boolean;
  purpose: string;
  is_bulk_payment: boolean;
  agent_current_balance: number;
  channel: string;
  currency: string;
  ip_address: string;
  total: number;
  has_confirmed: boolean;
  creation_time: string;
  last_updated_time: string;
  owner: IUser;
  product: IProduct;
  // agent_payment: IAgentCommission;
}

///response type for transactions
export interface ISalesIncomesResponse
  extends IPaginatedResponse<ISalesIncome> {}

export interface IPaymentToAgent {
  id: number;
  transaction_reference: string | null;
  status: string;
  has_paid_agent: boolean;
  purpose: string;
  is_bulk_payment: boolean;
  agent_current_balance: number;
  channel: string | null;
  currency: string | null;
  ip_address: string | null;
  total: number;
  has_confirmed: boolean;
  creation_time: string;
  last_updated_time: string;
  product: IProduct;
  owner: IUser;
  agent_paid: IAgent;
}

export interface IPaymentToAgentResponse
  extends IPaginatedResponse<IPaymentToAgent> {}
export interface ICustomerPurchases {
  id: number;
  transaction_reference: string;
  status: string;
  has_paid_agent: boolean;
  purpose: string;
  is_bulk_payment: boolean;
  agent_current_balance: number;
  channel: string;
  currency: string;
  ip_address: string;
  total: number;
  has_confirmed: boolean;
  creation_time: string;
  last_updated_time: string;
  product: IProduct;
  owner: IUser;
  agent_paid: IAgent;
}
export interface ICustomerPurchasesResponse
  extends IPaginatedResponse<ICustomerPurchases> {}
interface IBaseQueryParams {
  search?: string;
  ordering?: string;
  page?: number;
  page_size?: number;
  month?: string;
  year?: string;
}

export interface ISalesInterfaceQueryParams extends IBaseQueryParams {
  product?: string;
  owner?: string;
  status?: "None" | "Pending" | "Paid" | "Failed";
  purpose?: "Purchase" | "Agent Payment";
  agent_paid?: string;
  product__product_type?: string;
  owner__referral_code?: string;
}

export interface IAgentEarningQueryParams extends IBaseQueryParams {
  region?: string;
  referral_code?: string;
  id?: string;
  page_size: number; // This is required in IAgentEarningQueryParams
}

export interface IPaymentToAgentQueryParams extends IBaseQueryParams {
  product?: string;
  owner?: string;
  status?: "None" | "Pending" | "Paid" | "Failed";
  purpose?: "Purchase" | "Agent Payment";
  agent_paid?: string;
  product__product_type?: string;
  owner__referral_code?: string;
}
