import { useContext, useState } from "react"
import { VehicleContext } from "../../../../contexts/Table/vehicle"

interface PaginationItemProps {
    number: number,
    isCurrent?: boolean,
    skip?: number,
    onPageChange: (page: number) => void
}

function PaginationItem({ isCurrent = false, number, onPageChange }: PaginationItemProps) {
    const [active, setActive] = useState(true)
    const [take, setTake] = useState<Number>(5)
    // const [skip, setSkip] = useState(0)

    const { search, type, page, pageR } = useContext(VehicleContext)

    async function next() {
        await page(number)

        await search({ take: take as number, pageR: number - 1 as number })
    }

    return (
        <button type="button" onClick={() => { onPageChange(number), next() }} className={`mt-5 bg-white w-10 h-10 rounded-md border-2 ${isCurrent ? "bg-blue-400 text-white border-none" : ''} `}
        >
            {number}
        </button>
    )
}

export default PaginationItem