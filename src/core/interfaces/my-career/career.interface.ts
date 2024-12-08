import { IconType } from "react-icons";

export interface MyCareer {
    dateRange: string;
    dotIcon: IconType;
    empress: string;
    empressImage: string;
    description: string;
    progression?: MyEmpressProgresion[];
}

export interface MyEmpressProgresion {
    promotionDate: Date;
    position: string;
    evaluation: string;
}