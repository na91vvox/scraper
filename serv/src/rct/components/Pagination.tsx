interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => any;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const isPrevButton = currentPage > 1;
    const isNextButton = currentPage < totalPages;

    return (
        <nav className="pagination">
            {isPrevButton &&
                <button onClick={() => onPageChange(currentPage - 1)}>prev</button>
            }
            {isNextButton &&
                <button onClick={() => onPageChange(currentPage + 1)}>next</button>
            }
            <p>{currentPage} / {totalPages}</p>
        </nav>
    );
};

export default Pagination;
