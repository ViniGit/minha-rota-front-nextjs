import RouteModel from "./RouteModel"
import VehicleModel from "./VehicleModel"

export default interface TravelModel {
    id?: string
    date?: string
    description: string
    route: RouteModel
    vehicle: VehicleModel
    travels: Number
}

