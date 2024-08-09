import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Layout, Menu, theme, Tag, Button, Input, Table, Popconfirm } from 'antd';
import type { TableColumnsType } from 'antd';
import './style.scss';
import ModalForm from "../../components/modals";

const { Content } = Layout;

interface DataType {
    key: string;
    id: number;
    date: string;
    city: string;
    temperature: string;
    weather: string;
    shift: string;
    precipitation: string;
    humidity: string;
    wind: string;
}

interface ExpandedDataType {
    key: string;
    precipitation: string;
    humidity: string;
    wind: string;
}

const shiftMap: Record<string, string> = {
    'Manhã': 'MANHA',
    'Tarde': 'TARDE',
    'Noite': 'NOITE',
};

const ListPage: React.FC = () => {
    const [current, setCurrent] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [inputValue, setInputValue] = useState<string>('');
    const [dataSource, setDataSource] = useState<DataType[]>([]);
    const [filteredData, setFilteredData] = useState<DataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const navigate = useNavigate(); 

    const fetchData = async () => {
        try {
            setLoading(true);

            const response = await axios.get('http://localhost:8080/dados-metereologicos');

            const formattedData = response.data.map((item: any) => ({
                key: item.id,
                id: item.id,
                date: item.data,
                city: item.cidade,
                temperature: `${item.tempMin} - ${item.tempMax}`,
                weather: item.clima,
                shift: item.turno === 'MANHA' ? 'Manhã' : item.turno === 'TARDE' ? 'Tarde' : 'Noite',
                precipitation: item.precipitacao,
                humidity: item.umidade,
                wind: item.velDoVento,
            }));

            setDataSource(formattedData);
            setFilteredData(formattedData); 
        } catch (err) {
            setError('Failed to fetch data');
        } finally {
            setLoading(false);
        }
    };

    const filterData = () => {
        const filtered = dataSource.filter(item =>
            item.city.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredData(filtered);
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        filterData();
    }, [inputValue, dataSource]);

    const handleCancel = () => {
        setIsModalVisible(false);
    };


    const handleDelete = async (record: DataType) => {
        try {
            const { city, date, shift } = record;
            const shiftApiValue = shiftMap[shift];

            await axios.delete(`http://localhost:8080/dados-metereologicos/${city}/${date}/${shiftApiValue}`);

            setDataSource(prevData => prevData.filter(item =>
                !(item.city === city && item.date === date && item.shift === shift)
            ));

            filterData();
            setIsModalVisible(true);

        } catch (err) {
            setError('Failed to delete data');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrent(page);
    };

    const handleGoToPage = () => {
        const page = parseInt(inputValue, 10);
        if (!isNaN(page) && page > 0) {
            setCurrent(page);
        }
    };

    const handleUpdate= (record: DataType) => {
        const shift = shiftMap[record.shift];
        navigate(`/atualizar/${record.city}/${record.date}/${shift}`);
    };

    const columns: TableColumnsType<DataType> = [
        { title: 'Data', dataIndex: 'date', key: 'date' },
        { title: 'Cidade', dataIndex: 'city', key: 'city' },
        { title: 'Temperatura', dataIndex: 'temperature', key: 'temperature' },
        { title: 'Clima', dataIndex: 'weather', key: 'weather' },
        {
            title: 'Turno',
            dataIndex: 'shift',
            key: 'shift',
            render: (shift: string) => {
                let color: string;
                switch (shift) {
                    case 'Manhã':
                        color = 'yellow';
                        break;
                    case 'Tarde':
                        color = 'red';
                        break;
                    case 'Noite':
                        color = 'purple';
                        break;
                    default:
                        color = 'grey';
                }
                return <Tag color={color}>{shift}</Tag>;
            },
        },
        {
            title: '',
            key: 'edit',
            render: (_, record) => <Button type="link" onClick={() => handleUpdate(record)}>Editar</Button>,
        },
        {
            title: '',
            key: 'delete',
            render: (_, record) =>
                <Popconfirm
                    title="Are you sure to delete this item?"
                    onConfirm={() => handleDelete(record)}
                >
                    <a>Delete</a>
                </Popconfirm>
        },
    ];

    const expandedRowRender = (record: DataType) => {
        const expandedColumns: TableColumnsType<ExpandedDataType> = [
            { title: 'Precipitação', dataIndex: 'precipitation', key: 'precipitation' },
            { title: 'Umidade', dataIndex: 'humidity', key: 'humidity' },
            { title: 'Velocidade do vento', dataIndex: 'wind', key: 'wind' },
        ];

        const expandedData = [
            {
                key: record.key,
                precipitation: record.precipitation,
                humidity: record.humidity,
                wind: record.wind,
            },
        ];

        return <Table columns={expandedColumns} dataSource={expandedData} pagination={false} />;
    };

    return (
        <Layout>
            <Content
                style={{
                    background: theme.useToken().token.colorBgContainer,
                    padding: '0 10%'
                }}>
                <div>
                    <h2>Lista de Dados Meteorológicos</h2>
                </div>
                <div className="input-cidade">
                    <div className=""
                        style={{
                            background: theme.useToken().token.colorBgContainer,
                            borderRadius: theme.useToken().token.borderRadiusLG,
                        }}
                    >
                        <Input
                            placeholder="Digite o nome da cidade"
                            value={inputValue}
                            onChange={(e) => {
                                setInputValue(e.target.value); 
        
                            }}
                            onPressEnter={filterData}
                        />
                    </div>
                    <div className="tabela"
                        style={{
                            background: theme.useToken().token.colorBgContainer,
                            borderRadius: theme.useToken().token.borderRadiusLG,
                        }}
                    >
                        {loading ? (
                            <p>Loading...</p>
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                            <Table
                                columns={columns}
                                expandable={{ expandedRowRender }}
                                dataSource={filteredData}
                                pagination={{
                                    position: ["bottomCenter"],
                                    current,
                                    pageSize,
                                    onChange: handlePageChange,
                                    showSizeChanger: true,
                                    pageSizeOptions: ['10', '20', '50', '100'],
                                }}
                                scroll={{ x: 1500 }}
                                sticky={{ offsetHeader: 64 }}
                                locale={{
                                    emptyText: <div className="custom-no-data">Não há dados cadastrados</div>,
                                }}
                            />
                        )}
                    </div>
                </div>
                <ModalForm
                    isModalVisible = {isModalVisible}
                    onCancel={handleCancel}
                    message="Dados excluídos com sucesso!"
                />
            </Content>
        </Layout>
    );
};

export default ListPage;
