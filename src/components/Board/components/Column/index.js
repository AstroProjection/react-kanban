import { forwardRef } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Card from './components/Card'
import withDroppable from '../../../withDroppable'
import CardAdder from './components/CardAdder'
import ColumnFooter from './components/ColumnFooter/ColumnFooter'
import { pickPropOut } from '@services/utils'

const ColumnEmptyPlaceholder = forwardRef((props, ref) => (
  <div ref={ref} style={{ minHeight: 'inherit', height: 'inherit' }} {...props} />
))

const DroppableColumn = withDroppable(ColumnEmptyPlaceholder)

function Column({
  children,
  index: columnIndex,
  renderCard,
  renderColumnHeader,
  renderColumnFooter,
  disableColumnDrag,
  disableCardDrag,
  onCardNew,
  allowAddCard,
}) {
  return (
    <Draggable draggableId={`column-draggable-${children.id}`} index={columnIndex} isDragDisabled={disableColumnDrag}>
      {(columnProvided) => {
        const draggablePropsWithoutStyle = pickPropOut(columnProvided.draggableProps, 'style')
        return (
          <div
            ref={columnProvided.innerRef}
            {...draggablePropsWithoutStyle}
            style={{
              height: '100%',
              minHeight: '28px',
              display: 'inline-block',
              verticalAlign: 'top',
              ...columnProvided.draggableProps.style,
            }}
            className='react-kanban-column'
            data-testid={`column-${children.id}`}
          >
            <div {...columnProvided.dragHandleProps}>{renderColumnHeader(children)}</div>
            {allowAddCard && <CardAdder column={children} onConfirm={onCardNew} />}
            <DroppableColumn droppableId={String(children.id)}>
              {children.cards.length ? (
                children.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    index={index}
                    renderCard={(dragging) => renderCard(children, card, dragging)}
                    disableCardDrag={disableCardDrag}
                  >
                    {card}
                  </Card>
                ))
              ) : (
                <div className='react-kanban-card-skeleton' />
              )}
            </DroppableColumn>
            {renderColumnFooter && <ColumnFooter>{renderColumnFooter()}</ColumnFooter>}
          </div>
        )
      }}
    </Draggable>
  )
}

export default Column
