export interface IAppointmentReview {
  id: string;
  healthcare: string;
  rating: number;
  appointment: string;
  ratings_count: string;
  comment: string;
  created_at: string; // ISO timestamp
  updated_at: string; // ISO timestamp
}
