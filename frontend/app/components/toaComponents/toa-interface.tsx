export interface CreateToa {
    team: string;
    actionTitle: string;
    imageName: string;
}

export interface EditToa{
    team: string;
    actionTitle: string;
    imageName: string;
    isDefault: boolean;
    oldTeam: string; 
    oldActionTitle: string; 
    oldImageName: string; 
    oldIsDefault: boolean; 
}