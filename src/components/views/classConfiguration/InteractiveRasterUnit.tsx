import React, { Component } from 'react';
import styled from 'styled-components';
import map from 'lodash/map';
import throttle from 'lodash/throttle';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import InteractiveRasterRow from './InteractiveRasterRow';
import { TopicIndexType } from '../../types';
import DraggableRasterElement from './dragAndDrop/DraggableRasterElement';
import TrashDrop from './TrashDrop';
import { TOPIC_TEMPLATE } from './constants';
import {
  getClassTopicsAfterInsertion,
  getClassTopicsAfterMove
} from './helper';
import TopicTooltip from './TopicTooltip';

type ClassInstanceType = {
  [classId: string]: {
    id: string;
    name: string;
    topics: TopicIndexType[];
  };
};

interface PropsType {
  onEditTemplate: (templateId: string) => void;
  onDeleteTemplate: (templateId: string) => void;
  onEditInstance: (instanceId: string) => void;
  updateClassInstances: (classInstaces: ClassInstanceType) => void;
  onSaveConfiguration: () => void;
  rasterCount: number;
  rasterSize: number;
  topicTemplates: TopicType[];
  classInstances: ClassInstanceType;
  classLevelId: string;
  wrapRasterRows: (
    children: JSX.Element | JSX.Element[]
  ) => JSX.Element | JSX.Element[];
}

interface TopicType {
  id: string;
  text: string;
  width: number;
  color: string;
}

interface StateType {
  tempClassInstances: {
    [classId: string]: {
      id: string;
      name: string;
      topics: TopicIndexType[];
    };
  };
  isDragging: boolean;
}

const FlexContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const FlexChild = styled.div`
  min-width: 0px;
  > * {
    margin-right: 5px;
    margin-bottom: 5px;
  }
`;

const StyledContainer = styled.div`
  min-width: 0px;
`;

const RowContainer = styled.div`
  & > * {
    padding: 10px 0px;
    margin-top: 20px;
    :first-child {
      margin-top: 15px;
    }
    :last-child {
      margin-bottom: 5px;
    }
  }
`;

const StyledTrashDrop = styled(TrashDrop)`
  margin-left: 20px;
  margin-top: -15px;
  line-height: 1px;
`;

@DragDropContext(HTML5Backend)
class InteractiveRasterUnit extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {
      tempClassInstances: props.classInstances,
      isDragging: false
    };
  }

  setDraggingState = () => {
    this.setState({
      ...this.state,
      isDragging: true
    });
  };

  resetDragState = () => {
    // Cancel throttling
    this.softRelocateTopicElement.cancel();
    this.softInsertTopicElement.cancel();

    this.setState({
      ...this.state,
      tempClassInstances: this.props.classInstances,
      isDragging: false
    });
  };

  commitCurrentDragState = () => {
    // Cancel throttling
    this.softRelocateTopicElement.cancel();
    this.softInsertTopicElement.cancel();

    this.setState({
      isDragging: false
    });
    this.props.updateClassInstances(this.state.tempClassInstances);
  };

  softRelocateTopicElement = throttle(
    (
      rowId: string,
      elementIndex: number,
      insertStartIndex: number,
      width: number,
      elementValues: Partial<TopicIndexType>
    ) => {
      const newTemporaryClassTopics = getClassTopicsAfterMove(
        insertStartIndex,
        elementIndex,
        width,
        elementValues,
        this.props.rasterCount,
        this.props.classInstances[rowId].topics
      );
      const newTempClassInstances = {
        ...this.props.classInstances,
        [rowId]: {
          ...this.props.classInstances[rowId],
          topics: newTemporaryClassTopics
        }
      };

      this.setState({
        isDragging: true,
        tempClassInstances: newTempClassInstances
      });
    },
    150
  );

  softInsertTopicElement = throttle(
    (
      rowId: string,
      insertStartIndex: number,
      width: number,
      elementValues: Partial<TopicIndexType>
    ) => {
      const newTemporaryClassTopics = getClassTopicsAfterInsertion(
        insertStartIndex,
        width,
        elementValues,
        this.props.rasterCount,
        this.props.classInstances[rowId].topics
      );
      const newTempClassInstances = {
        ...this.props.classInstances,
        [rowId]: {
          ...this.props.classInstances[rowId],
          topics: newTemporaryClassTopics
        }
      };

      this.setState({
        isDragging: true,
        tempClassInstances: newTempClassInstances
      });
    },
    150
  );

  deleteTopic = (classId: string, index: number) => {
    const newTopics = [...this.props.classInstances[classId].topics];
    newTopics.splice(index, 1);
    this.updateClassInstance(classId, newTopics);
    this.setState({
      isDragging: false
    });
  };

  updateClassInstance = (classId: string, topics: TopicIndexType[]) => {
    const newClassInstances = {
      ...this.props.classInstances,
      [classId]: {
        ...this.props.classInstances[classId],
        topics
      }
    };

    this.props.updateClassInstances(newClassInstances);
    this.setState({
      isDragging: false,
      tempClassInstances: newClassInstances
    });
  };

  render() {
    const {
      topicTemplates,
      rasterSize,
      rasterCount,
      wrapRasterRows,
      classLevelId
    } = this.props;
    const classInstances = this.state.isDragging
      ? this.state.tempClassInstances
      : this.props.classInstances;
    return (
      <StyledContainer>
        {wrapRasterRows(
          <RowContainer>
            {map(classInstances, classInstance => (
              <InteractiveRasterRow
                topicElements={classInstance.topics}
                rasterSize={rasterSize}
                rasterCount={rasterCount}
                rowId={classInstance.id}
                classLevelId={classLevelId}
                key={classInstance.id}
                updateElements={this.updateClassInstance}
                softRelocateTopicElement={this.softRelocateTopicElement}
                softInsertTopicElement={this.softInsertTopicElement}
                onElementDidNotDrop={this.resetDragState}
                onElementDidDrop={this.commitCurrentDragState}
                onEditInstance={this.props.onEditInstance}
                onDeleteInstance={this.deleteTopic}
                onSaveConfiguration={this.props.onSaveConfiguration}
              />
            ))}
          </RowContainer>
        )}
        <FlexContainer>
          <FlexChild>
            {topicTemplates.map(topicTemplate => (
              <TopicTooltip
                key={topicTemplate.id}
                isDisabled={this.state.isDragging}
                isLocal={false}
                onDeleteClick={() =>
                  this.props.onDeleteTemplate(topicTemplate.id)
                }
                onEditClick={() => this.props.onEditTemplate(topicTemplate.id)}
              >
                <span>
                  <DraggableRasterElement
                    id={topicTemplate.id}
                    classLevelId={classLevelId}
                    type={TOPIC_TEMPLATE}
                    color={topicTemplate.color}
                    isTransparentWhileDragging={false}
                    onElementDidNotDrop={this.resetDragState}
                    onElementStartDrag={this.setDraggingState}
                    text={topicTemplate.text}
                    rasterSize={rasterSize}
                    startIndex={0}
                    endIndex={topicTemplate.width - 1}
                  />
                </span>
              </TopicTooltip>
            ))}
          </FlexChild>
          <StyledTrashDrop onElementDidDrop={this.deleteTopic} />
        </FlexContainer>
      </StyledContainer>
    );
  }

  static defaultProps = {
    wrapRasterRows: (children: JSX.Element | JSX.Element[]) => children
  };
}

export default InteractiveRasterUnit;
