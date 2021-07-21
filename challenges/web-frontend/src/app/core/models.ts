export interface IResponseAuth {
  token: string;
  authenticared: boolean;
  userId: string;
  internalUserId: number;
  internalUserUUID: string;
  type: string;
  privileges: string;
}

export interface IResponseAuctions {
  items: IAuction[];
}

export interface IAuction {
  id: number;
  endingTime: string;
  startedAt: string;
  createdAt: string;
  updatedAt: string;
  minimumRequiredAsk: number;
  currentHighestBidValue: number;
  locationCountryCode: string;
  startingBidValue: number;
  remainingTimeInSeconds: number;
  associatedVehicle: IVehicle;
  label: string;
  hotBid: boolean;
  amIHighestBidder: boolean;
}

export interface IVehicle {
  id: number;
  ez: string;
  make: string;
  mileageInKm: number;
  model: string;
  vin: string;
  hasAccident: boolean;
  accidentDescription: boolean;
  urlToAttachment1: string;
  urlToVehicleSummarySheet: string;
  amIHighestBidder: boolean;
  hasMaintenanceBook: boolean;
  lastServiceInspectionDate: boolean;
  lastServiceInspectionMileage: boolean;
  damagesDescription: string;
  fuelType: number;
  transmission: number;
}
