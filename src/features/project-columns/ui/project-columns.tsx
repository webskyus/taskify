import {useEffect, useLayoutEffect, useState} from 'react';
import {
    CreateColumnDialog,
    useSetCreateColumnDialogForm,
} from '~/features/create-column-dialog';
import {useLoaderData, useOutletContext, useParams} from '@remix-run/react';
import {loader} from '~/routes/dashboard_.$workspaceId_.$projectId';
import {ProjectColumnsItem} from '~/features/project-columns/ui/components/project-columns-item';
import {EmptyResultMessage} from '~/shared/ui/empty-result-message';
import {ErrorMessage} from '~/shared/ui/error-message';
import {
    updateProjectColumnApi,
    useGetProjectColumns,
} from '~/features/project-columns';
import {getCurrentInfo, getObjectKeysLength} from '~/shared/lib/utils';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {SupabaseClient} from '@supabase/supabase-js';
import {ProjectColumn} from '~/routes/dashboard';
import {reorder, reorderColumnTasks} from '~/shared/lib/utils/dnd';
import {CreateTaskDialog} from "~/features/create-task-dialog";

const getListStyle = (isDraggingOver: boolean) => ({
    display: 'flex',
    width: '100%',
    minHeight: '250px',
    alignItems: 'items-start',
    padding: 0,
    paddingBottom: 20,
    overflow: 'auto',
});

const ProjectColumns = () => {
    const {supabase} = useOutletContext<{
        supabase: SupabaseClient;
    }>();

    const {projectId} = useParams();
    const {projects} = useLoaderData<typeof loader>();
    const {projectColumns, error} = useGetProjectColumns();

    const [editedProjectColumnId, setEditedProjectColumnId] = useState<string>();
    const [columns, setColumns] = useState<ProjectColumn[]>(projectColumns);
    const [createTaskDialogState, setCreateTaskDialogState] = useState(false);
    // const [ordered, setOrdered] = useState<ProjectColumn[]>(projectColumns);

    const {defaultValue} = useSetCreateColumnDialogForm(editedProjectColumnId, projectColumns);
    const {name, description} = getCurrentInfo(projects, projectId);

    useEffect(() => {
        handleReCheckProjectColumnsList(projectColumns);
    }, [projectColumns]);

    const handleReCheckProjectColumnsList = (projectColumns: ProjectColumn[]) => {
        const projectColumnIds = projectColumns.map((projectColumn) => projectColumn.id);
        const checkColumnNames = columns.filter((column) => {
            const findMatchedProjectColumn = projectColumns.find(projectColumn => projectColumn.id === column.id);
            if (projectColumnIds.includes(column.id) && column.name !== findMatchedProjectColumn?.name) {
                return column;
            }
        });

        (
            columns.length !== projectColumns.length ||
            checkColumnNames.length
        ) &&
        setColumns(projectColumns);
    }

    const onDragEnd = async (result: DropResult) => {
        const {destination, source, draggableId, combine, type} = result;
        const data = getCurrentInfo(projectColumns, draggableId);
        const formData = {...data, id: draggableId};

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        )
            return;

        if (combine) {
            if (type === 'column') {
                const shallow = [...columns];
                shallow.splice(source.index, 1);
                setColumns(shallow);

                return;
            }

            // const column = columns.find(column => column.id === source.droppableId);
            // const withQuoteRemoved = [...column];
            //
            // withQuoteRemoved.splice(source.index, 1);
            //
            // const orderedColumns = {
            //     ...columns,
            //     [source.droppableId]: withQuoteRemoved,
            // };
            //
            // setColumns(orderedColumns);

            return;
        }

        if (type === 'column') {
            const _ordered = reorder(columns, source.index, destination.index);

            setColumns(_ordered);
            await updateProjectColumnApi({
                supabase,
                formData,
                projectColumns: _ordered,
            });

            return;
        }

        const {quoteMap} = reorderColumnTasks({
            quoteMap: columns,
            source,
            destination,
        });

        // setColumns(quoteMap);
    };

    return (
        <>
            <header className={'flex items-center justify-between mb-6'}>
                <header>
                    <h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>{name}</h1>
                    <p className={'text-md'}>{description}</p>
                </header>

                <CreateColumnDialog
                    handleSetId={setEditedProjectColumnId}
                    id={editedProjectColumnId}
                    defaultValue={defaultValue}
                />
            </header>

            {!columns?.length && !error && <EmptyResultMessage/>}

            {error && <ErrorMessage/>}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='board' type='column' direction='horizontal'>
                    {(provided, snapshot) => (
                        <section
                            style={getListStyle(snapshot.isDraggingOver)}
                            {...provided.droppableProps}
                            ref={provided.innerRef}>
                            {columns.map((data, index) => {
                                const {id} = data;

                                return (
                                    <ProjectColumnsItem
                                        key={id}
                                        handleSetId={setEditedProjectColumnId}
                                        data={data}
                                        index={index}
                                        handleOpenCreateTaskDialog={setCreateTaskDialogState}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </section>
                    )}
                </Droppable>
            </DragDropContext>

            <CreateTaskDialog isOpen={createTaskDialogState}
                              setIsOpen={setCreateTaskDialogState}
                              projectColumnId={'test'}
                              projectColumnName={'Test 1'}
            />
        </>
    );
};

export {ProjectColumns};
