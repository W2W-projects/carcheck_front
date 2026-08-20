export interface ApiPayloadResponse<T> {
  success: boolean;
  message: string | null;
  payload: T;
}

export interface ApiDataResponse<T> {
  success: boolean;
  message?: string | null;
  data: T;
}

export interface ApiMessageResponse {
  success: boolean;
  message: string | null;
}

export interface ApiErrorBody {
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface ApiRequestError {
  status: number;
  data: ApiErrorBody;
}

export interface Permission {
  id: number;
  name: string;
  slug: string;
  created_at: string;
}

export interface Role {
  id: number;
  name: string;
  slug: string;
  created_at: string;
  permissions?: Permission[];
}

export interface User {
  id?: number;
  first_name?: string;
  last_name?: string;
  name?: string;
  email: string;
  username?: string;
  status?: number | string;
  roles?: Array<Role | string>;
  permissions?: Array<Permission | string>;
  request_count?: number;
  one_off_request_count?: number;
  request_count_trial?: number;
  phone?: string | null;
  country?: string | null;
  city?: string | null;
  postcode?: string | null;
  address?: string | null;
  created_at?: string;
}

export interface AuthenticatedUser extends User {
  request_count: number;
  one_off_request_count: number;
  request_count_trial: number;
}

export interface LoginForm {
  email: string;
  password: string;
  procedure?: string;
  password_confirmation?: string;
}

export interface RegistrationForm {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  password: string | null;
  password_confirmation: string | null;
  terms?: boolean;
}

export interface EmailForm {
  email: string;
}

export interface ResetTokenForm {
  email: string | null;
  reset_token: string;
}

export interface PasswordChangeForm {
  password: string;
  password_confirmation: string;
  email?: string | null;
  current_password?: string;
  reset_token?: string | null;
}

export type UserUpdateForm = Partial<
  Pick<User, "first_name" | "last_name" | "email" | "phone" | "country" | "city" | "postcode">
>;

export interface Currency {
  id: number;
  code: string;
  symbol: string;
  created_at: string;
}

/** Mirrors PlanResource. The feature lists the pricing page renders come from
 *  `static/features.json`, not from here, so the API stopped sending its own. */
export interface Plan {
  id: number;
  name: string;
  plan_code: string;
  amount_trial: string;
  amount_premium: string;
  reports_count: number;
  reports_count_trial: number;
  status: "active" | "inactive";
  currency: Pick<Currency, "symbol">;
}

/** Mirrors SubscriptionResource - login, payment/process and payment/subscription all
 *  return this shape into the same `currentSubscription` slot. */
export interface Subscription {
  name?: string | null;
  status?: string | null;
  price?: string | number | null;
  is_active?: boolean;
  ends_at?: string | null;
  plan?: Pick<Plan, "name" | "plan_code"> & {
    currency?: Pick<Currency, "symbol">;
  };
}

export interface SubscriptionStatus {
  auth: boolean;
  active: boolean;
  subscription_type: string | null;
  request_count: number;
  one_off_request_count: number;
  request_count_trial: number;
  onTrial?: boolean;
}

export interface LoginPayload {
  access_token: string;
  refresh_token: string;
  token_type: "bearer";
  expires_in: number;
  user: AuthenticatedUser;
  hasSubscription: SubscriptionStatus;
  subscription: Subscription | "" | null;
}

/** Mirrors CustomPlanResource. `pricePerCheck` is derived in DiscountWidgets.vue. */
export interface CustomPlan {
  id: number;
  name: string;
  discount_percentage: string | number;
  price_after_discount: string | number;
  plan_code: string;
  reports_count: number;
  pricePerCheck?: number | null;
}

export interface CustomPlanPurchase {
  success: boolean;
  message: string;
  status?: string;
  requires_action?: boolean;
  payment_intent_client_secret?: string;
  payment_intent_id?: string;
  error_type?: string;
}

/** users/check-email-exist. An unknown address is registered on the spot and comes
 *  back logged in; a known one comes back as `existingUser` with nothing else. The
 *  new user carries no request counts yet - the account is seconds old. */
export type EmailCheckPayload =
  | { user_type: "existingUser" }
  | {
      user_type: "newlyCreatedUser";
      access_token: string;
      token_type: "bearer";
      expires_in: number;
      medium: string;
      user: User;
    };

export interface ReportLink {
  report_link: string;
}

export interface BillingDetails {
  name: string;
}

/** payment/token/create. A single-offer purchase settles inside the intent and so
 *  returns the refreshed counts instead of a `paymentStatus` to confirm against. */
export interface PaymentIntentPayload {
  clientSecret: string;
  customerId: string;
  paymentStatus?: string;
  hasSubscription?: SubscriptionStatus;
}

/** payment/process. `car_data` is a re-lookup of the registration paid for, in the
 *  same shape a search returns, so the report is ready by the time we redirect. */
export interface SubscriptionPurchasePayload {
  subscription: Subscription | null;
  hasSubscription: SubscriptionStatus;
  car_data: CarLookupPayload[] | null;
}

export interface PaymentIntentConfirmation {
  status: string;
  requires_action: boolean;
  client_secret: string | null;
}

export interface RequestCounts {
  request_count: number;
  one_off_request_count: number;
  request_count_trial: number;
}

export interface MotAnnotation {
  Text: string;
  Type: string;
  Dangerous: boolean;
}

export interface MotRecord {
  IsRetest?: boolean;
  TestDate: string;
  ExpiryDate?: string | null;
  TestNumber?: string;
  TestResult: string;
  DaysOutOfMot?: number;
  OdometerUnit?: "mi" | "km" | string;
  OdometerInMiles?: number | null;
  OdometerInKilometers?: number | null;
  OdometerReading?: number | null;
  DaysSinceLastPass?: number;
  DaysSinceLastTest?: number;
  FailureReasonList?: string[];
  MajorFailureCount?: number;
  AdvisoryNoticeList?: string[];
  AdvisoryNoticeCount?: number;
  MileageSinceLastPass?: number;
  AnnotationDetailsList?: MotAnnotation[];
  DangerousFailureCount?: number;
  MileageAnomalyDetected?: boolean;
}

/**
 * The overview figures above the MOT records, counted server-side over every test on
 * record. A locked report is only sent the records it displays, so these cannot be
 * derived from RecordList any more - RecordCount is the number of slots, RecordList is
 * the ones with data behind them, and the difference is what gets a padlock.
 */
export interface MotSummary {
  RecordCount: number;
  FailedTestCount: number;
  FailPercentage: number;
  AdvisoryTestCount: number;
  LongestDaysBetweenTests: number;
  LongestDaysOutOfMot: number;
}

/**
 * The odometer series mileage.vue charts. Kept apart from MotHistory so the chart can
 * stay complete at every tier while the MOT records ship only what the report displays -
 * one dated number per test, already resolved to Unit, instead of a whole record.
 */
export interface MileageHistory {
  Unit: "mi" | "km" | string;
  Readings: Array<{ TestDate: string | null; Odometer: number }>;
}

export interface MotHistory {
  RecordCount?: number;
  RecordList: MotRecord[];
  Summary?: Omit<MotSummary, 'RecordCount'>;
  AdditionalInformation?: Record<string, unknown> | null;
}

/** Mirrors CarListResource - what a dashboard card renders, and nothing else.
 *  `checkMonths` is the months this car was MOT'd in, for the garage filter. */
export interface CarDetails {
  make?: string | null;
  fuelType?: string | null;
  makeModel?: string | null;
  mileage?: number | null;
  yearOfManufacture?: string | number | null;
  vbrand_logo?: string | null;
  checkMonths?: string[];
}

export interface CarListItem {
  id: number;
  reg_number: string;
  image: string | null;
  details: CarDetails;
}

/** Mirrors CarDetailResource - the two things "See more" shows that its card does not.
 *  Fetched per car when the modal opens, not for the whole garage on page load. */
export interface CarDetail {
  id: number;
  details: {
    color?: string | null;
    motHistory?: { RecordList: MotRecord[] };
  };
}

export interface CarReport {
  id: number;
  url: string | null;
  reg_number: string;
  downloaded_count: number;
  created_at: string;
}

export interface SearchHistoryItem {
  id: number;
  reg_number: string | null;
  image: string | null;
  created_at: string;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  currentPage: number;
  perPage: number;
}

export interface SmmtDetails {
  ModelVariant?: string | null;
  FuelType?: string | null;
  Transmission?: string | null;
}

export interface VehicleRegistration {
  Colour?: string | null;
  Make?: string | null;
  Model?: string | null;
  DateFirstRegistered?: string | null;
  YearOfManufacture?: string | number | null;
  VehicleClass?: string | null;
  Co2Emissions?: number | null;
}

export interface MotVedRate {
  Standard?: {
    TwelveMonth?: string | number | null;
    SixMonth?: string | number | null;
  };
}

export interface MotVed {
  VedCo2Emissions?: number | null;
  VedCo2Band?: string | null;
  VedRate?: MotVedRate;
}

export interface VehicleHistory {
  NumberOfPreviousKeepers?: number | null;
  PlateChangeCount?: number | null;
}

export interface StolenRecord {
  Stolen?: boolean;
  StolenInfoSource?: string | null;
  StolenStatus?: string | null;
  StolenPoliceForce?: string | null;
  StolenDate?: string | null;
  StolenMiaftrRecordCount?: number;
  StolenMiaftrRecordList?: Array<Record<string, unknown>>;
}

export interface WriteOffRecord {
  WrittenOff?: boolean;
  WriteOffDate?: string | null;
  WriteOffCategory?: string | null;
  WriteOffRecordList?: Array<Record<string, unknown>>;
  WriteOffRecordCount?: number;
}

export interface FinanceAgreement {
  AgreementDate?: string | null;
  AgreementType?: string | null;
  AgreementTerm?: string | null;
  AgreementNumber?: string | null;
  FinanceCompany?: string | null;
  ContactNumber?: string | null;
  VehicleDescription?: string | null;
}

export interface FinanceRecords {
  FinanceRecordCount: number;
  FinanceRecordList: FinanceAgreement[];
}

export interface RiskRecords {
  HighRiskRecordCount: number;
  HighRiskRecordList: Array<Record<string, unknown>>;
}

export type VehicleValuations = Record<string, string | number>;
export type VehicleData = Record<string, unknown>;

export interface VehicleImages {
  ImageDetailsCount?: number;
  ImageDetailsList?: Array<{ ImageUrl?: string }>;
}

export interface CarLookupPayload extends Record<string, unknown> {
  VehicleImages?: VehicleImages;
  vbrand_logo?: string;
  SmmtDetails?: SmmtDetails;
  TechnicalDetails?: {
    Dimensions?: VehicleData;
    General?: VehicleData;
    Performance?: VehicleData;
  };
  VehicleRegistration?: VehicleRegistration;
  VehicleStatus?: { MotVed?: MotVed };
  ClassificationDetails?: VehicleData;
  VehicleHistory?: VehicleHistory;
  MotHistory?: MotHistory;
  MileageHistory?: MileageHistory;
  ValuationList?: VehicleValuations;
  Stolen?: boolean;
  StolenInfoSource?: string | null;
  StolenStatus?: string | null;
  StolenPoliceForce?: string | null;
  StolenDate?: string | null;
  StolenMiaftrRecordCount?: number;
  StolenMiaftrRecordList?: Array<Record<string, unknown>>;
  WrittenOff?: boolean;
  WriteOffDate?: string | null;
  WriteOffCategory?: string | null;
  WriteOffRecordList?: Array<Record<string, unknown>>;
  WriteOffRecordCount?: number;
  FinanceRecordCount?: number;
  FinanceRecordList?: FinanceAgreement[];
  HighRiskRecordCount?: number;
  HighRiskRecordList?: Array<Record<string, unknown>>;
  total_lookup?: number;
  allow_full_report?: boolean;
  request_count?: number | string;
  one_off_request_count?: number | string;
  request_count_trial?: number | string;
}

export interface CarRegistrationSearchState {
  reg_number: string;
  vehicleImageUrl: string | null;
  vehicleStatus: VehicleData | null;
  vehicleDetails: VehicleData | null;
  MOTHistory: MotRecord[];
  MOTSummary: MotSummary | null;
  mileageHistory: MileageHistory | null;
  MOTAdditionalInfo: VehicleData | null;
  technicalDetails: VehicleData | null;
  classificationDetails: VehicleData | null;
  vehicleHistory: VehicleHistory | null;
  vehicleValuationsList: VehicleValuations | null;
  dimensions: VehicleData | null;
  general: VehicleData | null;
  vehicleRegistration: VehicleRegistration | null;
  motVed: MotVed | null;
  smmtDetails: SmmtDetails | null;
  performance: VehicleData | null;
  vbrand_logo: string | null;
  getFullReportText: string;
  stolenRecord: StolenRecord | null;
  writeOff: WriteOffRecord | null;
  riskRecords: RiskRecords | null;
  financeRecords: FinanceRecords | null;
  totalNumberOfLooksUp: number;
  allowFullReport: boolean;
}
