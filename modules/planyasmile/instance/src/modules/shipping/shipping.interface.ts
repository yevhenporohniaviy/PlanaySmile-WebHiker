
export interface ShippingType {
  _id: String,
  collectionDate: Date
  earliestCollectionDate: Date,
  latestCollectionDate: Date,
  streetAddress: String,
  city: String,
  postalCode: String,
  phone: String,
  company: String,
  instructions: String,
}

export interface UpdateShippingTypeDto {
  collectionDate?: Date
  earliestCollectionDate?: Date,
  latestCollectionDate?: Date,
  streetAddress?: String,
  city?: String,
  postalCode?: String,
  phone?: String,
  company?: String,
  instructions?: String,
}

export interface ActionUpdateShippingTypeDto {
  _id: String,
  object: UpdateShippingTypeDto
}

