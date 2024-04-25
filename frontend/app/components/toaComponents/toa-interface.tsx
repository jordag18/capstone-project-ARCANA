export interface CreateToa {
  team: string;
  actionTitle: string;
  imageName: string | null;
}

export interface EditToa {
  team: string;
  actionTitle: string;
  imageName: string | null;
  isDefault: boolean;
  oldTeam: string;
  oldActionTitle: string;
  oldImageName: string | null;
  oldIsDefault: boolean | null;
}
