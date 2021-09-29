
export interface UserType {
  _id: String;
  email:String,
  password:String,
  role:String,
  token: String,
  address: String,
  street: String,
  postalCode: String,
  country: String,
  city: String,
  firstName: String,
  lastName: String,
  phone: String,
  company: String,
  honorific: String,
  legal: Boolean,
  notificationDate: Date,
}


export interface UpdateUserTypeDto {
  email?:String,
  password?:String,
  role?:String,
  token?: String,
  address?: String,
  street?: String,
  postalCode?: String,
  country?: String,
  city?: String,
  firstName?: String,
  lastName?: String,
  phone?: String,
  company?: String,
  legal?: Boolean,
  notificationDate?: Date,
  honorific?: String,
}

export interface ActionUpdateUserTypeDto {
  _id: String,
  object: UpdateUserTypeDto
}
