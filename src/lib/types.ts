export type Launch = {
  flight_number: number;
  mission_name: string;
  upcoming: boolean;
  launch_date_local: string;
  details: string;
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
  launch_success: boolean;
};
