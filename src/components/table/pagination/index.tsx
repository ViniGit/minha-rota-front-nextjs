import { useContext, useState } from "react"
import { RouteContextData } from "../../../contexts/Table/route"
import { TravelContextData } from "../../../contexts/Table/travel"
import PaginationItem from "./PaginationItem"

interface PaginationProps {
    totalCountRegisters: number
    registersPerPage?: number
    currentPage?: number
    onPageChange: (page: number) => void
    modelContext: RouteContextData | TravelContextData
}

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
    return [new Array(to - from)]
        .map((_, index) => {
            return from + index + 1
        })
        .filter(page => page > 0)
}

function Pagination({
    totalCountRegisters,
    registersPerPage = 5,
    currentPage = 1,
    onPageChange,
    modelContext
}: PaginationProps) {

    const [active, setActive] = useState(true)
    const [take, setTake] = useState<Number>(5)
    const [skip, setSkip] = useState(0)

    // @ts-ignore
    const { search } = useContext(modelContext)

    async function next() {
        await search({ take: take as number, pageR: skip as number })
    }

    let lastPage = Math.ceil(totalCountRegisters / registersPerPage)

    const previousPages = currentPage > 1
        ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
        : []

    const nextPage = currentPage < lastPage
        ? generatePagesArray(currentPage, Math.min(currentPage + siblingsCount, lastPage))
        : []

    return (
        <>
            <div className="mt-5">
                <strong>{(currentPage - 1) * registersPerPage}</strong> - <strong>{Math.min(currentPage * registersPerPage, totalCountRegisters)}</strong> de <strong>{totalCountRegisters}</strong>
            </div>
            <div className="w-[900px] mx-auto">
                <div className="flex justify-center items-end gap-2">

                    {currentPage > (1 + siblingsCount) && (
                        <>
                            <PaginationItem onPageChange={onPageChange} number={1} skip={0} modelContext={modelContext} />
                            {currentPage > (2 + siblingsCount) && <span className="text-lg font-bold">...</span>}
                        </>
                    )}

                    {previousPages && previousPages.length > 0 && previousPages.map(page => {
                        return <PaginationItem onPageChange={onPageChange} key={page} number={page} modelContext={modelContext} />
                    })}

                    <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent modelContext={modelContext} />

                    {nextPage && nextPage.length > 0 && nextPage.map(page => {
                        return <PaginationItem onPageChange={onPageChange} key={page} number={page} modelContext={modelContext} />
                    })}

                    {(currentPage + siblingsCount) < lastPage && (
                        <>
                            {(currentPage + 1 + siblingsCount) && <span className=" text-lg font-bold">...</span>}
                            <PaginationItem onPageChange={onPageChange} number={lastPage} modelContext={modelContext} />
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default Pagination