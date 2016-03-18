package com.kimreik.user;

import com.mysema.query.types.Path;
import com.mysema.query.types.PathMetadata;
import com.mysema.query.types.path.*;

import javax.annotation.Generated;

import static com.mysema.query.types.PathMetadataFactory.forVariable;

/**
 * QUser is a Querydsl query type for User
 */
@Generated("com.mysema.query.codegen.EntitySerializer")
public class QUser extends EntityPathBase<User>
{

	public static final QUser					user				= new QUser("user");
	private static final long					serialVersionUID	= -1192445577L;
	public final NumberPath<Integer>			currentRoomid		= createNumber("currentRoomid", Integer.class);

	public final BooleanPath					enabled				= createBoolean("enabled");

	public final ListPath<String, StringPath>	friends				= this.<String, StringPath> createList("friends", String.class, StringPath.class,
																			PathInits.DIRECT2);

	public final NumberPath<Long>				lastActivity		= createNumber("lastActivity", Long.class);

	public final NumberPath<Long>				lastHeartBeat		= createNumber("lastHeartBeat", Long.class);

	public final StringPath						matchingPassword	= createString("matchingPassword");

	public final StringPath						password			= createString("password");

	public final StringPath						role				= createString("role");

	public final EnumPath<UserStatus>			status				= createEnum("status", UserStatus.class);

	public final StringPath						username			= createString("username");

	public QUser(String variable)
	{
		super(User.class, forVariable(variable));
	}

	public QUser(Path<? extends User> path)
	{
		super(path.getType(), path.getMetadata());
	}

	public QUser(PathMetadata<?> metadata)
	{
		super(User.class, metadata);
	}

}
