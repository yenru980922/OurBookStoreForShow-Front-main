// Datatables.tsx
import { FC, Fragment, useState, useEffect, SetStateAction} from 'react';
import {Card, Col, Row, Form, Button} from 'react-bootstrap';
import {columns} from './TestingData';
import {ReactTabulator} from 'react-tabulator';
import "react-tabulator/lib/styles.css"; // default theme
import "react-tabulator/css/bootstrap/tabulator_bootstrap.min.css"; // use Theme(s)
import "react-tabulator/lib/css/bootstrap/tabulator_bootstrap.min.css";
import axios from 'axios';
import moment from 'moment';

interface DatatablesProps {
}

const Datatables: FC<DatatablesProps> = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);
    const [totalPages] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [usingStatus, setUsingStatus] = useState('');
    const [valid, setValid] = useState('');
    const [couponType, setCouponType] = useState('');
    const [data, setData] = useState([]);
    const [couponCode, setCouponCode] = useState('');

    const API_BASE_URL = 'https://localhost:7236/api'

    useEffect(() => {
        fetchData().then(r => console.log(r));
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/Coupons`);
            setData(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const SearchInput = ({searchText: filter, setSearchText}: { searchText: string; setSearchText: (value: string) => void; className?: string }) => {
        return (
            <Form.Control
                type="text"
                value={filter || ""}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="搜尋"
                className="me-2"
            />
        );
    };

    const filteredData = data.filter((item: { [key: string]: string | number | boolean }) => {
        const matchesSearchText = Object.values(item).some((value) =>
            String(value).toLowerCase().includes(searchText.toLowerCase())
        );

        const matchesUsingStatus = !usingStatus || item.usingStatus === usingStatus;
        const matchesValid = !valid || item.valid === (valid === 'true');
        const matchesCouponType = !couponType || item.couponType === couponType;

        return matchesSearchText && matchesUsingStatus && matchesValid && matchesCouponType;
    });

    const handleCouponCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCouponCode(e.target.value);
    };
    
    const generateNumber = () => {
        const number = Math.floor(Math.random() * 1000000).toString();
        return number.padStart(6, '0');
    };
    
    const generateDescription = (discountValue: number) => {
        const descriptions = [
            `天啊，是${discountValue}元折扣`,
            `超爽${discountValue}塊`,
            `${discountValue}送你用`,
            `${discountValue}隨你買`,
            `${discountValue}有夠爽`,
            `${discountValue}元優惠`,
            `現折${discountValue}`,
            `本週限定折${discountValue}`,
        ];
        const randomIndex = Math.floor(Math.random() * descriptions.length);
        return descriptions[randomIndex];
    };    

    const handleSaveCoupon = async () => {
        const discountValue = parseInt(couponCode.replace(/\D/g, '')) || 0;
        const currentDate = new Date();
        const endDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

        const newCoupon = {
            promotionID: 1,
            code: couponCode,
            startDate: currentDate.toISOString(),
            endDate: endDate.toISOString(),
            valid: true,
            description: generateDescription(discountValue),
            availabilityCount: generateNumber(),
            usingStatus: 'Unused',
            minimumValue: 100,
            discountValue: discountValue,
            discountLimit: 10000,
            couponTypeId: 1,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}/Coupons`, newCoupon);
            console.log('Coupon created:', response.data);
            setCouponCode('');
            await fetchData();
        } catch (error) {
            console.error('Error creating coupon:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return moment(dateString).format('YYYY/MM/DD HH:mm');
    };

    const formattedColumns = columns.map((column) => {
        if (column.field === 'startDate' || column.field === 'endDate') {
            return {
                ...column,
                formatter: (cell: { getValue: () => string }) => formatDate(cell.getValue()),
            };
        }
        return column;
    });

    return (
        <Fragment>
            <div className="main-container container-fluid">
                <Row>
                    <Col xl={12}>
                        <Card className="custom-card">
                            <Card.Header>
                                <Card.Title>
                                    優惠券總覽
                                </Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <div className="d-flex align-items-center mb-4">
                                    {/*<Form.Label className="me-2">新增優惠券：</Form.Label>*/}
                                    <SearchInput
                                        searchText={searchText}
                                        setSearchText={(value: SetStateAction<string>) => setSearchText(value)}
                                        className=" w-25 me-2"
                                    />
                                    <div className="w-50"></div>
                                    <Form.Control
                                        type="text"
                                        value={couponCode}
                                        onChange={handleCouponCodeChange}
                                        placeholder="輸入優惠券代碼"
                                        className=" me-2 w-50"
                                    />
                                    <Button variant="primary" onClick={handleSaveCoupon} className=" me-2 w-25">
                                        存入此優惠券
                                    </Button>
                                </div>
                                <div className="d-flex align-items-center mb-4">
                                    <Form.Select
                                        value={usingStatus}
                                        onChange={(e) => setUsingStatus(e.target.value)}
                                        className="me-2"
                                    >
                                        <option value="">所有使用狀況</option>
                                        <option value="Used">已使用</option>
                                        <option value="Unused">未使用</option>
                                        <option value="Deprecated">已過期</option>
                                    </Form.Select>
                                    <Form.Select
                                        value={valid}
                                        onChange={(e) => setValid(e.target.value)}
                                        className="me-2"
                                    >
                                        <option value="">所有狀態</option>
                                        <option value="true">可用</option>
                                        <option value="false">不可用</option>
                                    </Form.Select>
                                    <Form.Select
                                        value={couponType}
                                        onChange={(e) => setCouponType(e.target.value)}
                                    >
                                        <option value="">所有優惠券類型</option>
                                        <option value="Discount">折扣券</option>
                                        <option value="FullReduction">滿減券</option>
                                        <option value="FreeShipping">免運券</option>
                                    </Form.Select>                                 
                                </div>
                                <div className="table-responsive">
                                    <ReactTabulator
                                        className="table-hover table-bordered"
                                        data={filteredData}
                                        columns={formattedColumns}
                                        options={{
                                            pagination: 'local',
                                            paginationSize: pageSize,
                                            paginationSizeSelector: [10, 20, 50, 100],
                                            paginationInitialPage: currentPage,
                                            paginationButtonCount: 5,
                                            paginationDataReceived: { last_page: totalPages },
                                            paginationDataSent: { page: currentPage, size: pageSize }
                                        }}
                                        onPageChange={(data:{page: number}) => handlePageChange(data.page)}
                                    />
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </Fragment>
    );
};

export default Datatables;
