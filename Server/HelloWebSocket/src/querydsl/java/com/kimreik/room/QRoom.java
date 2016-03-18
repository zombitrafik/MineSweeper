package com.kimreik.room;

import com.mysema.query.types.Path;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import javax.annotation.Generated;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * QRoom is a Querydsl query type for Room
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QRoom extends EntityPathBase<Room>
{

	public static final QRoom													room				= new QRoom("room");
	private static final long													serialVersionUID	= 1695507319L;
	private static final PathInits												INITS				= PathInits.DIRECT2;
	public final com.kimreik.game.QGame											game;

	public final NumberPath<Integer>											gameType			= createNumber("gameType", Integer.class);

	public final NumberPath<Integer>											id					= createNumber("id", Integer.class);

	public final BooleanPath													isFinished			= createBoolean("isFinished");

	public final BooleanPath													isStarted			= createBoolean("isStarted");

	public final BooleanPath													isWin				= createBoolean("isWin");

	public final StringPath														name				= createString("name");

	public final NumberPath<Integer>											nextRoomId			= createNumber("nextRoomId", Integer.class);

	public final ListPath<com.kimreik.game.Player, com.kimreik.game.QPlayer>	players				= this.<com.kimreik.game.Player, com.kimreik.game.QPlayer> createList(
																											"players", com.kimreik.game.Player.class,
																											com.kimreik.game.QPlayer.class, PathInits.DIRECT2);

	public QRoom(String variable)
	{
		this(Room.class, forVariable(variable), INITS);
	}

	public QRoom(Path<? extends Room> path)
	{
		this(path.getType(), path.getMetadata(), path.getMetadata().isRoot() ? INITS : PathInits.DEFAULT);
	}

	public QRoom(PathMetadata<?> metadata)
	{
		this(metadata, metadata.isRoot() ? INITS : PathInits.DEFAULT);
	}

	public QRoom(PathMetadata<?> metadata, PathInits inits)
	{
		this(Room.class, metadata, inits);
	}

	public QRoom(Class<? extends Room> type, PathMetadata<?> metadata, PathInits inits)
	{
		super(type, metadata, inits);
		this.game = inits.isInitialized("game") ? new com.kimreik.game.QGame(forProperty("game"), inits.get("game")) : null;
	}

}
