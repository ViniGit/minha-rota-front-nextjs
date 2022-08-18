export const mask = (value: string) => {
    value = value.replace(/\D/g, "")

    if (value.length <= 11) {
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d)/, "$1.$2")
        value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    } else if (value.length <= 14) {
        value = value.replace(/^(\d{2})(\d)/, "$1.$2")
        value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        value = value.replace(/\.(\d{3})(\d)/, ".$1/$2")
        value = value.replace(/(\d{4})(\d)/, "$1-$2")
    } else {

    }

    return value
}


export const removeMask = (value:string )=>{
    
    return value.replace(/\D/g,'')
}