import RouteModel from "./RouteModel"
import VehicleModel from "./VehicleModel"

export default interface TravelModel {
    id?: string
    date: Date
    description: string
    route: RouteModel
    vehicle: VehicleModel
    travels: Number
    position: Number
}

