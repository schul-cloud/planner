import React, { Component } from 'react';
import styled from 'styled-components';
import ComponentProvider from '../provider/componentProvider';
import { TopicElementsType, EventType } from '../types';
import YearlyCalendar from './YearlyCalendar';

type PropsType = {
  rasterSize: number;
  schoolYear: {
    startDate: number; // first day of school
    endDate: number; // last day of school
  };
  today: number;
  classTopicsData: {
    className: string;
    classes: {
      subjectId: string;
      subjectName: string;
      topics: TopicElementsType[];
    }[];
  }[];
  holidaysData: EventType;
  otherEventsData: EventType;
  onTopicInstanceClick: (id: string) => void;
};

type StateType = {
  selectedCalendarType: 'YEAR' | '3MONTH' | '2WEEKS';
};

const StyledNotifications = styled.div`
  min-height: 100px;
`;
const StyledLabelContainer = styled.div`
  margin: 15px 0px 20px;
`;

class CalendarView extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = { selectedCalendarType: 'YEAR' };
  }

  buildTwoWeekCalendar = () => {
    return <div>2 Weeks</div>;
  };
  buildThreeMonthCalendar = () => {
    return <div>3 Months</div>;
  };
  buildYearlyCalendar = () => {
    return <YearlyCalendar {...this.props} />;
  };
  buildCalendar = (selectedCalendarType: 'YEAR' | '3MONTH' | '2WEEKS') => {
    switch (selectedCalendarType) {
      case 'YEAR':
        return this.buildYearlyCalendar();
      case '3MONTH':
        return this.buildThreeMonthCalendar();
      case '2WEEKS':
        return this.buildTwoWeekCalendar();
    }
  };

  getCurrentDayString() {
    const today = new Date();
    return `Heute ist der ${today.getDate()}.${today.getMonth() + 1}.`;
  }

  onCalendarTypeChange = (calendarType: 'YEAR' | '3MONTH' | '2WEEKS') => {
    this.setState({
      selectedCalendarType: calendarType
    });
  };

  render() {
    const calendar = this.buildCalendar(this.state.selectedCalendarType);

    return (
      <>
        <ComponentProvider.Headline caption="Übersicht" />
        <StyledNotifications />
        <ComponentProvider.Tabs
          selected={this.state.selectedCalendarType}
          items={[
            { id: 'YEAR', text: 'Schuljahr' },
            { id: '3MONTH', text: 'Drei Monate' },
            { id: '2WEEKS', text: 'Zwei Wochen' }
          ]}
          onChange={id =>
            this.onCalendarTypeChange(id as 'YEAR' | '3MONTH' | '2WEEKS')
          }
        />
        <StyledLabelContainer>
          <ComponentProvider.Label caption={this.getCurrentDayString()} />
        </StyledLabelContainer>
        {calendar}
      </>
    );
  }

  static defaultProps = {
    rasterSize: 15
  };
}

export default CalendarView;
