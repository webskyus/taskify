import {useState} from "react";
import {CreateColumnDialog} from '~/features/create-column-dialog';
import {useLoaderData, useOutletContext, useParams} from '@remix-run/react';
import {loader} from '~/routes/dashboard_.$workspaceId_.$projectId';
import {ProjectColumnsItem} from '~/features/project-columns/ui/components/project-columns-item';
import {EmptyResultMessage} from '~/shared/ui/empty-result-message';
import {ErrorMessage} from '~/shared/ui/error-message';
import {updateProjectColumnApi, useGetProjectColumns} from '~/features/project-columns';
import {getCurrentInfo} from '~/shared/lib/utils';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {SupabaseClient} from "@supabase/supabase-js";
import {ProjectColumn} from "~/routes/dashboard";
import {reorder, reorderColumnTasks} from "~/shared/lib/utils/dnd";

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

    const {projects} = useLoaderData<typeof loader>();
    const {projectId} = useParams();

    const {projectColumns, error} = useGetProjectColumns();
    const {name, description} = getCurrentInfo(projects, projectId);

    const [columns, setColumns] = useState(projectColumns);
    const [ordered, setOrdered] = useState<ProjectColumn[]>(projectColumns);

    const onDragEnd = async (result: DropResult) => {
        const {destination, source, draggableId, combine, type} = result;
        const data = getCurrentInfo(projectColumns, draggableId);
        const order = Number((Math.random() * 10).toFixed());
        const formData = {...data, id: draggableId};

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        if (combine) {
            if (type === 'column') {
                const shallow = [...ordered];
                shallow.splice(source.index, 1);
                setOrdered(shallow);

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
            const _ordered = reorder(
                ordered,
                source.index,
                destination.index
            );

            setOrdered(_ordered);
            await updateProjectColumnApi({
                supabase,
                formData,
                projectId,
                projectColumns: _ordered
            })

            return;
        }

        const {quoteMap} = reorderColumnTasks({
            quoteMap: columns,
            source,
            destination,
        });

        setColumns(quoteMap);
    };

    return (
        <>
            <header className={'flex items-center justify-between mb-6'}>
                <header>
                    <h1 className={'mb-1 text-4xl sm:text-6xl font-bold'}>{name}</h1>
                    <p className={'text-md'}>{description}</p>
                </header>

                <CreateColumnDialog handleSetId={() => 1}/>
            </header>

            {!projectColumns?.length && !error && <EmptyResultMessage/>}

            {error && <ErrorMessage/>}

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable
                    droppableId="board"
                    type="column"
                    direction="horizontal"
                >
                    {(provided, snapshot) => (
                        <section style={getListStyle(snapshot.isDraggingOver)}
                                 {...provided.droppableProps}
                                 ref={provided.innerRef}>
                            {
                                ordered.map((data, index) => {
                                    const {id} = data;

                                    return <ProjectColumnsItem key={id}
                                                               data={data}
                                                               index={index}/>
                                })
                            }
                            {provided.placeholder}
                        </section>
                    )}
                </Droppable>
            </DragDropContext>


            {/*<Column*/}
            {/*	key={key}*/}
            {/*	index={index}*/}
            {/*	title={key}*/}
            {/*	quotes={columns[key]}*/}
            {/*	isScrollable={withScrollableColumns}*/}
            {/*	isCombineEnabled={isCombineEnabled}*/}
            {/*	useClone={useClone}*/}
            {/*/>*/}

            {/*<DragDropContext onDragEnd={onDragEnd}>*/}
            {/*	<Droppable*/}
            {/*		droppableId='droppable'*/}
            {/*		direction='horizontal'*/}
            {/*		children={(provided, snapshot) => (*/}
            {/*			<section*/}
            {/*				ref={provided.innerRef}*/}
            {/*				style={getListStyle(snapshot.isDraggingOver)}*/}
            {/*				{...provided.droppableProps}>*/}
            {/*				{_projectColumns.map((projectColumn, index) => (*/}
            {/*					<Draggable*/}
            {/*						key={projectColumn.id}*/}
            {/*						draggableId={projectColumn.id}*/}
            {/*						index={index}>*/}
            {/*						{(provided, snapshot) => (*/}
            {/*							<article*/}
            {/*								ref={provided.innerRef}*/}
            {/*								{...provided.draggableProps}*/}
            {/*								{...provided.dragHandleProps}>*/}
            {/*								<ProjectColumnsItem data={projectColumn} />*/}
            {/*							</article>*/}
            {/*						)}*/}
            {/*					</Draggable>*/}
            {/*				))}*/}
            {/*				{provided.placeholder}*/}
            {/*			</section>*/}
            {/*		)}*/}
            {/*	/>*/}
            {/*</DragDropContext>*/}
        </>
    );
};

export {ProjectColumns};
