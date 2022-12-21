export interface Transaction {
    status:  boolean;
    message: string;
    data:    Data;
}

export interface Data {
    id:                   number;
    domain:               string;
    status:               string;
    reference:            string;
    amount:               number;
    message:              null;
    gateway_response:     string;
    paid_at:              Date;
    created_at:           Date;
    channel:              string;
    currency:             string;
    ip_address:           string;
    metadata:             string;
    log:                  Log;
    fees:                 number;
    fees_split:           null;
    authorization:        Authorization;
    customer:             Customer;
    plan:                 null;
    split:                PlanObject;
    order_id:             null;
    paidAt:               Date;
    createdAt:            Date;
    requested_amount:     number;
    pos_transaction_data: null;
    source:               null;
    fees_breakdown:       null;
    transaction_date:     Date;
    plan_object:          PlanObject;
    subaccount:           PlanObject;
}

export interface Authorization {
    authorization_code: string;
    bin:                string;
    last4:              string;
    exp_month:          string;
    exp_year:           string;
    channel:            string;
    card_type:          string;
    bank:               string;
    country_code:       string;
    brand:              string;
    reusable:           boolean;
    signature:          string;
    account_name:       null;
}

export interface Customer {
    id:                         number;
    first_name:                 null;
    last_name:                  null;
    email:                      string;
    customer_code:              string;
    phone:                      null;
    metadata:                   null;
    risk_action:                string;
    international_format_phone: null;
}

export interface Log {
    start_time: number;
    time_spent: number;
    attempts:   number;
    errors:     number;
    success:    boolean;
    mobile:     boolean;
    input:      any[];
    history:    History[];
}

export interface History {
    type:    string;
    message: string;
    time:    number;
}

export interface PlanObject {
}
