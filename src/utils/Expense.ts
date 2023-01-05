function typeExpenseTransform(type: string) {
    switch (type) {
        case 'mechanics':
            return 'Mecânica'
        case 'driver':
            return 'Motorista'
        case 'fuel':
            return 'Combustível'
        case 'other':
            return 'Outro'

        default:
            break;
    }

}

export { typeExpenseTransform }