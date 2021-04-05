import { Draggable } from 'react-beautiful-dnd'

function ColumnFooter({children }) {
  return (
    <Draggable className='react-kanban-column-footer-container' isDragDisabled={true} draggableId={String(Math.random())}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            data-testid={`card-${children.id}`}
          >
            {children}
          </div>
        )
      }}
    </Draggable>
  )
}

export default ColumnFooter
