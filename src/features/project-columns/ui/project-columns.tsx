import {useState} from "react";
import {CreateColumnDialog} from '~/features/create-column-dialog';
import {useLoaderData, useOutletContext, useParams} from '@remix-run/react';
import {loader} from '~/routes/dashboard_.$workspaceId_.$projectId';
import {ProjectColumnsItem} from '~/features/project-columns/ui/components/project-columns-item';
import {EmptyResultMessage} from '~/shared/ui/empty-result-message';
import {ErrorMessage} from '~/shared/ui/error-message';
import {useGetProjectColumns} from '~/features/project-columns';
import {getCurrentInfo} from '~/shared/lib/utils';
import {DragDropContext, Droppable, DropResult} from 'react-beautiful-dnd';
import {SupabaseClient} from "@supabase/supabase-js";
import {ProjectColumn} from "~/routes/dashboard";
import {reorder, reorderQuoteMap} from "~/shared/lib/utils/dnd";

const getListStyle = (isDraggingOver: boolean) => ({
    display: 'flex',
    width: '100%',
    minHeight: '240px',
    alignItems: 'items-start',
    padding: 0,
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
    const [ordered, setOrdered] = useState(columns);

    const onDragEnd = async (result: DropResult) => {
        const {destination, source, draggableId, combine} = result;
        const data = getCurrentInfo(projectColumns, draggableId);
        const order = Number((Math.random() * 10000000).toFixed());
        const formData = {...data, id: draggableId};

        if (!destination) return;

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) return;

        if (result.combine) {
            if (result.type === 'COLUMN') {
                const shallow = [...ordered];
                shallow.splice(source.index, 1);
                setOrdered(shallow);
                return;
            }

            const column = columns[source.droppableId];
            const withQuoteRemoved = [...column];

            withQuoteRemoved.splice(source.index, 1);

            const orderedColumns = {
                ...columns,
                [source.droppableId]: withQuoteRemoved,
            };
            setColumns(orderedColumns);
            return;
        }

        if (result.type === 'COLUMN') {
            setOrdered(
                reorder(
                    ordered,
                    source.index,
                    destination.index
                )
            );

            return;
        }

        const {quoteMap} = reorderQuoteMap({
            quoteMap: columns,
            source,
            destination,
        });

        setColumns(quoteMap);

        // await updateProjectColumnApi({
        // 	supabase,
        // 	formData,
        // 	order
        // })
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
                    type="COLUMN"
                    direction="horizontal"
                    ignoreContainerClipping={true}
                    isCombineEnabled={false}
                >
                    {(provided, snapshot) => (
                        <section style={getListStyle(snapshot.isDraggingOver)}
                                 ref={provided.innerRef}
                                 {...provided.droppableProps}
                        >
                            {
                                ordered.map((key, index) => {
                                    return <ProjectColumnsItem key={key} data={columns[index]} index={index}/>
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
