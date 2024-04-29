export interface Event {
  id: string;
  action_title: string;
  data_source: string;
  description: string;
  icon: string;
  initials: string;
  is_malformed: boolean;
  last_modified: string;
  location: string;
  posture: string;
  source_host: string;
  target_host_list: Array<any>; // You can replace `any` with a more specific type if the structure of target hosts is known
  team: string;
  timestamp: string;
  vector_id: string;
}

export interface CreateEvent {
  action_title: string;
  data_source: string;
  description: string;
  icon: string;
  initials: string;
  is_malformed: boolean;
  last_modified: string;
  location: string;
  posture: string;
  source_host: string;
  target_host_list: Array<any>;
  team: string;
  timestamp: string;
  vector_id: string;
}
