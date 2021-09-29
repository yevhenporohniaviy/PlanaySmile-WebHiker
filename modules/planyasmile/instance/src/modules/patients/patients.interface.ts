import { UserType } from "./../users/users.interface";

export interface PatientsType {
  _id: String,
  firstName: String,
  lastName: String,
  socialSecurityNumber: String,
  address: String,
  postalCode: String,
  phone: String,
  email: String,
  sex: String,
  dateOfBirth: Date,
  imageURL: String,
  orderStatus: String,
  notice: String,
  user: UserType['_id'] | null
}

export interface UpdatePatientsTypeDto {
  firstName?: String,
  lastName?: String,
  socialSecurityNumber?: String,
  address?: String,
  postalCode?: String,
  phone?: String,
  email?: String,
  sex?: String,
  dateOfBirth?: Date,
  imageURL?: String,
  orderStatus?: String,
  notice?: String,
  user?: UserType['_id'] | null
}

export interface ActionUpdatePatientsTypeDto {
  _id:String,
  object:UpdatePatientsTypeDto
}
