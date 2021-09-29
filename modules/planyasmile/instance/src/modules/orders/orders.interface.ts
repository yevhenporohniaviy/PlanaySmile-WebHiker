import {PatientsType} from "~/modules/planyasmile/instance/src/modules/patients/patients.interface";

export interface OrdersType {
  _id: String,
  data: Date,
  status: String,
  anamnese: ArrayBuffer,
  class: ArrayBuffer,
  attachment: Boolean,
  ASR: Boolean,
  desiredDate: String,
  patientImage: String[],
  cephalometricRadiography: String[],
  panoramicXRay: String[],
  intraoralScan:String[] ,
  teeth: String[],
  collect: Boolean,
  notes: String,
  pickup: PickUp,
  PRN: String,
  variationNumber: Number,
  orderNumber: Number,
  patient: PatientsType['_id'] | null
}

export interface UpdateOrdersTypeDto {
  data?: Date,
  status?: String,
  anamnese?: ArrayBuffer,
  class?: ArrayBuffer,
  attachment?: Boolean,
  ASR?: Boolean,
  desiredDate?: String,
  patientImage?: String[],
  cephalometricRadiography?: String[],
  panoramicXRay?: String[],
  intraoralScan?:String[] ,
  teeth?: String[],
  collect?: Boolean,
  notes?: String,
  pickup?: PickUp,
  PRN?: String,
  variationNumber?: Number,
  orderNumber?: Number,
  patient?: PatientsType['_id'] | null
}

export interface ActionUpdateOrdersTypeDto {
  _id: String,
  object: UpdateOrdersTypeDto
}

interface PickUp {
  collectionDate: Date,
  earliestCollectionDate: Date,
  latestCollectionDate: Date,
  streetAddress: String,
  city: String,
  postalCode: String,
  phone: String,
  company: String,
  instructions: String
}
