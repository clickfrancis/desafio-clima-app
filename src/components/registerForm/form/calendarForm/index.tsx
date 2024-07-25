import React from "react";
import dayjs from 'dayjs';

import 'dayjs/locale/zh-cn';

import { Calendar, Col, Radio, Row, Select, theme, Typography } from 'antd';
import type { CalendarProps } from 'antd';
import type { Dayjs } from 'dayjs';
import dayLocaleData from 'dayjs/plugin/localeData';
import './style.scss';

dayjs.extend(dayLocaleData);

interface Props {
  onDateSelect: (date: string) => void;
}

const CalendarForm: React.FC<Props> = (props: Props) => {
  const { onDateSelect } = props;

  const { token } = theme.useToken();

  const onPanelChange = (value: Dayjs, mode: CalendarProps<Dayjs>['mode']) => {
    console.log(value.format('YYYY-MM'), mode);
  };

  const wrapperStyle: React.CSSProperties = {
    width: 300,
    border: `1px solid ${token.colorBorderSecondary}`,
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div style={wrapperStyle}>
      <Calendar
        fullscreen={false}
        headerRender={({ value, onChange }) => {
          const start = 0;
          const end = 12;
          const monthOptions = [];

          let current = value.clone();
          const localeData = value.localeData();
          const months = [];
          for (let i = 0; i < 12; i++) {
            current = current.month(i);
            months.push(localeData.monthsShort(current));
          }

          for (let i = start; i < end; i++) {
            monthOptions.push(
              <Select.Option key={i} value={i} className="month-item">
                {months[i]}
              </Select.Option>,
            );
          }

          const year = value.year();
          const month = value.month();
          const options = [];
          for (let i = year - 10; i < year + 10; i += 1) {
            options.push(
              <Select.Option key={i} value={i} className="year-item">
                {i}
              </Select.Option>,
            );
          }

          const handleMonthChange = (direction: number) => {
            const newMonth = value.clone().add(direction, 'month');
            onChange(newMonth);
          };

          const handleYearChange = (direction: number) => {
            const newYear = value.clone().add(direction, 'year');
            onChange(newYear);
          };

          return (
            <div style={{ padding: 8 }}>
              <Row gutter={8}>
                <Col flex="none">
                  <div style={{ padding: '0 0px' }}>
                    <button className='button-handle' onClick={() => handleYearChange(-1)}>{"<<"}</button>
                  </div>
                </Col>
                <Col flex="none">
                  <div style={{ padding: '0 0px' }}>
                  <button className='button-handle' onClick={() => handleMonthChange(-1)}>{"<"}</button>
                  </div>
                </Col>
                <Col flex="auto">
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    value={month}
                    onChange={(newMonth) => {
                      const now = value.clone().month(newMonth);
                      onChange(now);
                    }}
                  >
                    {monthOptions}
                  </Select>
                </Col>
                <Col flex="auto">
                  <Select
                    size="small"
                    dropdownMatchSelectWidth={false}
                    className="my-year-select"
                    value={year}
                    onChange={(newYear) => {
                      const now = value.clone().year(newYear);
                      onChange(now);
                    }}
                  >
                    {options}
                  </Select>
                </Col>
                <Col flex="none">
                  <div style={{ padding: '0 0px' }}>
                    <button className="button-handle" onClick={() => handleMonthChange(1)}>{">"}</button>
                  </div>
                </Col>
                <Col flex="none">
                  <div style={{ padding: '0 0px' }}>
                    <button className='button-handle' onClick={() => handleYearChange(1)}>{">>"}</button>
                  </div>
                </Col>
              </Row>
            </div>
          );
        }}
        onPanelChange={onPanelChange}
        onSelect={(value) => {
          const selectedDate = value.format('YYYY-MM-DD');
          onDateSelect(selectedDate); 
          console.log('aqui'+ value.format('YYYY-MM-DD'));
      }}
      />
    </div>
  );
};

export default CalendarForm;