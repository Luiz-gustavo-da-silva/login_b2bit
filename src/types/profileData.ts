interface Avatar {
  high: string;
  id: number;
  low: string;
  medium: string;
}

export interface ProfileData {
  avatar: Avatar;
  created: string;
  email: string;
  id: number;
  is_active: boolean;
  modified: string;
  name: string;
  role: string;
  type: string;
}
