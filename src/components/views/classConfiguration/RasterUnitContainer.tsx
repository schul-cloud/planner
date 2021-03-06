import React, { PureComponent } from 'react';
import styled from 'styled-components';
import InteractiveRasterUnit from './InteractiveRasterUnit';
import { TopicIndexType, EventType, SchoolYearType } from '../../types';
import { TimeRasterWrapper } from '../../plannerBase';
import RowCaptions from './RowCaptions';
import {
  generateMonthLabelMap,
  generateWeeklyColorMap
} from '../../plannerBase';
import ComponentProvider from '../../provider/componentProvider';

type ClassInstanceType = {
  [classId: string]: {
    id: string;
    name: string;
    topics: TopicIndexType[];
  };
};

interface TopicTemplateType {
  id: string;
  text: string;
  width: number;
  color: string;
}

interface PropsType {
  rasterCount: number;
  rasterSize: number;
  topicTemplates: TopicTemplateType[];
  classInstances: ClassInstanceType;
  classLevelId: string;
  schoolYear: SchoolYearType;
  eventData: EventType;
  onAddTemplateClick: (classLevelId: string) => void;
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (classLevelId: string, templateId: string) => void;
  onEditInstance: (instanceId: string) => void;
  onUpdate: (classLevelId: string, classes: ClassInstanceType) => void;
  onSaveConfiguration: () => void;
}

const FlexContainer = styled.div`
  display: flex;
  > * {
    box-sizing: border-box;
  }
`;
const FlexChild = styled.div`
  min-width: 0px;
`;
const StyledButtonContainer = styled.div<{ hasTemplates: boolean }>`
  margin-top: ${({ hasTemplates }) => (hasTemplates ? '0px' : '-36px')};
`;

class RasterUnitContainer extends PureComponent<PropsType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      classInstances: props.classInstances
    };
  }

  wrapRasterRowsWithGrid = (children: JSX.Element | JSX.Element[]) => {
    const monthLabels = generateMonthLabelMap(
      this.props.schoolYear.utcStartDate,
      this.props.schoolYear.utcEndDate
    );
    const rasterColors = generateWeeklyColorMap(
      this.props.eventData,
      this.props.schoolYear.utcStartDate
    );
    return (
      <TimeRasterWrapper
        rasterCount={this.props.rasterCount}
        rasterSize={this.props.rasterSize}
        columnColorMap={rasterColors}
        topLabelsMap={monthLabels}
      >
        {children}
      </TimeRasterWrapper>
    );
  };

  updateClassInstance = (classInstances: ClassInstanceType) => {
    this.props.onUpdate(this.props.classLevelId, classInstances);
  };

  generateLabels = () => {
    const rasterColors = generateWeeklyColorMap(
      this.props.eventData,
      this.props.schoolYear.utcStartDate
    );
    // Get keys that represent a week, where holidays or other events happen -> no school
    const noSchoolIndexSet = new Set(Object.keys(rasterColors));

    return Object.values(this.props.classInstances).map(classInstance => {
      const freeSlotsCount = classInstance.topics.reduce(
        (count, topic) => {
          let actualTopicLength = 0;
          for (let i = topic.startIndex; i <= topic.endIndex; i++) {
            actualTopicLength += noSchoolIndexSet.has(`${i}`) ? 0 : 1;
          }
          return count - actualTopicLength;
        },
        this.props.rasterCount - noSchoolIndexSet.size // subtract number of holiday weeks
      );
      return {
        text: classInstance.name,
        subText: freeSlotsCount > 0 ? `${freeSlotsCount} frei` : ''
      };
    });
  };

  handleDeleteTopicTemplate = (templateId: string) => {
    this.props.onDeleteTemplate(this.props.classLevelId, templateId);
  };

  render() {
    const { onAddTemplateClick } = this.props;
    const labels = this.generateLabels();

    return (
      <>
        <FlexContainer>
          <RowCaptions labels={labels} />
          <FlexChild>
            <InteractiveRasterUnit
              updateClassInstances={this.updateClassInstance}
              classInstances={this.props.classInstances}
              topicTemplates={this.props.topicTemplates}
              rasterCount={this.props.rasterCount}
              rasterSize={this.props.rasterSize}
              wrapRasterRows={this.wrapRasterRowsWithGrid}
              classLevelId={this.props.classLevelId}
              onEditTemplate={this.props.onEditTemplate}
              onDeleteTemplate={this.handleDeleteTopicTemplate}
              onEditInstance={this.props.onEditInstance}
              onSaveConfiguration={this.props.onSaveConfiguration}
            />
            <StyledButtonContainer
              hasTemplates={!!this.props.topicTemplates.length}
            >
              <ComponentProvider.Button
                caption="+ Themenvorlage"
                size="small"
                type="thin"
                onClick={() => onAddTemplateClick(this.props.classLevelId)}
              />
            </StyledButtonContainer>
          </FlexChild>
        </FlexContainer>
      </>
    );
  }
}

export default RasterUnitContainer;
